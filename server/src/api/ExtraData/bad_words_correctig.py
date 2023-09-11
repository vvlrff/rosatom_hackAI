import pickle

with open(r'server\src\api\ExtraData\bad_words.pickle', 'rb') as pickle_bad_words: 
    bad_words = pickle.load(pickle_bad_words)
    print(len(bad_words))
#     bad_words.remove('сила')
#     bad_words.append('лох')
#     bad_words.append('pussy')
#     bad_words.append('faggot')
#     print(len(bad_words))

# with open(r'server\src\api\ExtraData\bad_words.pickle', 'wb') as pickle_bad_words: 
#     pickle.dump(bad_words, pickle_bad_words)
# # print(bad_words)