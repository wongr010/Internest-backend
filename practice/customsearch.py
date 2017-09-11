

import pprint
import json
from googleapiclient.discovery import build


def main():
  
  service = build("customsearch", "v1",
            developerKey="AIzaSyCbkv8APJpXoY9g0C5xBrjm0QoOzWpNDL4")

 

  res = service.cse().list(
      q='lectures',
      cx='016645967909671143784:7kxbz6q2n8s',
    ).execute()
  with open('data.json', 'w') as outfile:
        json.dump(res, outfile, indent=4)

if __name__ == '__main__':
	main()
