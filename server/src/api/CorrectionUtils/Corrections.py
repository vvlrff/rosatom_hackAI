import json
import pickle

from pyaspeller import YandexSpeller

import os


class Correction:
    def __init__(self) -> None:
        file_path_bad_words = os.path.join(os.getcwd(), 'src', 'api', 'ExtraData', 'bad_words.pickle')
        file_path_codes = os.path.join(os.getcwd(), 'src', 'api',  'ExtraData', 'codes.json')

        self.speller = YandexSpeller()
        with open(file_path_bad_words, 'rb') as pickle_bad_words: 
            self.bad_words = pickle.load(pickle_bad_words)

        with open(file_path_codes, encoding='utf-8') as file:
            self.emoji = json.load(file)

    def correct_bad_words(self, text):
        words = text.split()

        for i in range(len(words)):
            word = words[i]

            if word.lower() in self.bad_words:
                censored_word = "*" * len(word)
                words[i] = censored_word

        corrected_text = " ".join(words)
        return corrected_text

    def correct_spelling(self, text):
        return self.speller.spelled(text)
    
    def correct_emoji(self, text):
        return ' '.join([self.emoji[word] if word in self.emoji else word for word in text.split()])
    
    def correct(self, text):
        return self.correct_bad_words(self.correct_spelling(self.correct_emoji(text)))
    
    def correct_without_bad_words(self, text):
        return self.correct_spelling(self.correct_emoji(text))
