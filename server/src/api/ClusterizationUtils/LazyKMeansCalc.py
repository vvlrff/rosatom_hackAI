from typing import Union

from sklearn.metrics import silhouette_score

from sklearn.cluster import KMeans


class LazyKMeansCalc:
    """
    Selects the optimal clustering for a fixed number of clusters.
    An ensemble of algorithms is used to determine the optimal clustering
    """

    K_MEANS_PLUS_PLUS = 'k-means++'
    MAX_SINGLE_ITER = 300
    MAX_ATTEMPT_CALC = 10
    STOP_CALC = 15

    def __init__(self, cluster_count: int, embeddings: [[float]]):
        self.cluster_count = cluster_count
        self.embeddings = embeddings

    def clustering(self) -> Union[float, int, KMeans]:
        """
        Calculates RANDOM_ITER_COUNT clustering with random selection of centroids
        return: the best clustering by the silhouette metric, cluster count and the best silhouette score
        """
        best_silhouette_avg = None
        best_k_means = None

        for step in range(self.MAX_ATTEMPT_CALC):
            current_km_random = self.calc_k_means()
            current_silhouette_avg = silhouette_score(self.embeddings, current_km_random.labels_)

            if best_silhouette_avg is None:
                best_silhouette_avg = current_silhouette_avg
                best_k_means = current_km_random
            elif best_silhouette_avg < current_silhouette_avg:
                best_silhouette_avg = current_silhouette_avg
                best_k_means = current_km_random

        return best_silhouette_avg, self.cluster_count, best_k_means

    def calc_k_means(self) -> KMeans:
        """
        Basic function for calculations KMeans
        :return: сlustering
        """
        k_means = KMeans(n_clusters=self.cluster_count,
                         init=self.K_MEANS_PLUS_PLUS,
                         n_init=self.STOP_CALC,
                         max_iter=self.MAX_SINGLE_ITER)
        k_means.fit(self.embeddings)

        return k_means
