import numpy as np

import json

import torch

import time

from transformers import AutoTokenizer, AutoModel

from .ClusterizationUtils.KMeans import KMeansPlusPlus
from .CorrectionUtils.Corrections import Correction


class Clusterization:
    def __init__(self):
        self.DEBUG_MODE = False

        if self.DEBUG_MODE:
            start_time = time.time()

        self.tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/LaBSE")
        self.model = AutoModel.from_pretrained("sentence-transformers/LaBSE")
        self.correction = Correction()

        if self.DEBUG_MODE:
            print(f"Model load: {time.time() - start_time}")

        # self.tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
        # self.model = AutoModel.from_pretrained("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")

    def embed_bert_cls(self, text):
        t = self.tokenizer(text, padding=True, truncation=True, return_tensors='pt')
        with torch.no_grad():
            model_output = self.model(**{k: v.to(self.model.device) for k, v in t.items()})
        embeddings = model_output.last_hidden_state[:, 0, :]
        embeddings = torch.nn.functional.normalize(embeddings)
        return embeddings[0].cpu().numpy()

    def calc(self, file=None, target=None):
        if self.DEBUG_MODE:
            start_time = time.time()

        if file:
            with open(file, encoding='utf-8') as file:
                data = json.load(file)
                self.question_id, self.question, self.answers = data['id'], data['question'], [element['answer'] for element in data['answers']]

        elif target:
            self.question_id, self.question, self.answers = 1, target[0]['question'], target[0]['answer']

        else:
            raise ValueError('Incorrect input')

        self.vectorized_docs = [self.embed_bert_cls(self.correction.correct_without_bad_words(text)) for text in self.answers]

        k_num, self.clustering = KMeansPlusPlus(self.vectorized_docs).calc()
        self.cluster_sizes = np.bincount(self.clustering.labels_)

        self.descriptions = []
        self.output = []

        for i in range(k_num):
            most_representative_docs = np.argsort(np.linalg.norm(self.vectorized_docs - self.clustering.cluster_centers_[i], axis=1))

            top_texts = []

            for d in most_representative_docs[:self.cluster_sizes[i]]:
                top_texts.append(self.answers[d])

            self.output.append({'category_namber':f'{i+1}',
                                'count': int(self.cluster_sizes[i]),
                                'comparative_size': float(self.cluster_sizes[i] / len(self.answers)),
                                'cluster': self.correction.correct(top_texts[0]),
                                'cluster_answers': [self.correction.correct(answer) for answer in top_texts]})
            
        self.final_output = {'question': self.question,
                            'question_id': self.question_id,
                            'answer': self.output}

        if self.DEBUG_MODE:
            print(self.final_output)
            print(start_time - time.time())

        return self.final_output
        

if __name__ == '__main__':
    Clust = Clusterization()
    Clust.calc(r'Tests\all\2159.json')
