
import json
from sklearn.cluster import KMeans

data=json.load(open("../data/culture_dataset_120.json"))

X=[[d['pdi'],d['idv'],d['mas'],d['uai'],d['lto'],d['ivr']] for d in data]

model = KMeans(n_clusters=4, random_state=0).fit(X)

for i,d in enumerate(data):
 print(d['country'], model.labels_[i])
