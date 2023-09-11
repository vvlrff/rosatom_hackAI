from abc import abstractmethod, ABC

from concurrent.futures import ProcessPoolExecutor

from typing import Union

from sklearn.cluster import KMeans

from .LazyKMeansCalc import LazyKMeansCalc

import math


class BaseMethod(ABC):
    """
    Base class for determining optimal clustering
    """

    SYSTEM_MAX_THREAD = 8
    SYSTEM_MAX_CLUSTER = 25

    PROPORTIONALITY_EMBEDDINGS_TO_THREAD = 20
    PROPORTIONALITY_EMBEDDINGS_TO_CLUSTER = 2

    def __init__(self, embeddings: [[float]]):
        self.embeddings = embeddings
        self.k_min = 2
        self.k_max = min(len(self.embeddings)//self.PROPORTIONALITY_EMBEDDINGS_TO_CLUSTER + 1, self.SYSTEM_MAX_CLUSTER)
        self.MAX_THREAD = min(self.SYSTEM_MAX_THREAD, len(self.embeddings)//self.PROPORTIONALITY_EMBEDDINGS_TO_THREAD + 1)

    @abstractmethod
    def calc(self) -> Union[int, KMeans]:
        """
        return: the number of clusters and the resulting clustering for this method
        """
        pass


class Silhouette(BaseMethod):
    """ Silhouette method """

    def calc(self) -> Union[int, KMeans]:
        all_scores, clusters = [], []

        with ProcessPoolExecutor(max_workers=self.MAX_THREAD) as executor:
            futures = [executor.submit(LazyKMeansCalc(cluster_count=n_clusters, embeddings=self.embeddings).clustering)
                       for n_clusters in range(self.k_min, self.k_max)]

            for future in futures:
                clusters.append(future.result())

        best_score, best_cluster_count, best_k_means = None, None, None

        for cluster in clusters:
            score, cluster_count, k_means = cluster

            if best_score is None:
                best_score, best_cluster_count, best_k_means = score, cluster_count, k_means
            elif best_score < score:
                best_score, best_cluster_count, best_k_means = score, cluster_count, k_means

        return best_cluster_count, best_k_means


class KMeansPlusPlus:

    ALL_METHOD = 'all'
    SILHOUETTE_METHOD = 'silhouette'

    AVERAGE_AGGREGATION = 'average'
    POPULAR_AGGREGATION = 'popular'

    SYSTEM_MAX_THREAD = 8
    PROPORTIONALITY_EMBEDDINGS_TO_THREAD = 1

    """
    An ensemble of heuristic methods is used to determine the clusters

    method:
        'all' - use all method
        'silhouette' - use only Silhouette method
        'elbow' - use only Elbow method

    aggregation:
        'average' - returns the average response from all methods used
        'popular' - returns the most frequent response of all the methods used

    embeddings:
        embeddings is embeddings) 
    """
    def __init__(self, embeddings: [[float]], method: str = 'all', aggregation: str = 'average'):
        self.method = method
        self.aggregation = aggregation
        self.embeddings = embeddings
        self.MAX_THREAD = min(self.SYSTEM_MAX_THREAD, len(self.embeddings) // self.PROPORTIONALITY_EMBEDDINGS_TO_THREAD + 1)

    def get_methods(self) -> [BaseMethod]:
        methods = []

        if self.method == self.ALL_METHOD:
            methods.append(Silhouette(embeddings=self.embeddings))
        elif self.method == self.SILHOUETTE_METHOD:
            methods.append(Silhouette(embeddings=self.embeddings))
        else:
            raise ValueError("The method is specified incorrectly")

        return methods

    def aggregate(self, potential_clusters: [Union[float, int, KMeans]]) -> int:
        if len(potential_clusters) == 1:
            return potential_clusters[0]

        if self.aggregation == self.AVERAGE_AGGREGATION:
            return math.ceil(sum(potential_clusters) / len(potential_clusters))
        elif self.aggregation == self.POPULAR_AGGREGATION:
            return max(set(potential_clusters), key=potential_clusters.count)
        else:
            raise ValueError("The aggregation is specified incorrectly")

    def calc(self) -> Union[int, KMeans]:
        methods: [BaseMethod] = self.get_methods()
        potential_clusters = []
        threads = []

        with ProcessPoolExecutor(max_workers=self.MAX_THREAD) as executor:
            for method in methods:
                threads.append(executor.submit(method.calc))

            for thread in threads:
                potential_clusters.append(thread.result())

        return self.aggregate(potential_clusters)