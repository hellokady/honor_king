import requests
from bs4 import BeautifulSoup
import time

headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) '
                         'Chrome/63.0.3239.26 Safari/537.36 Core/1.63.5958.400 SLBrowser/10.0.3533.400'}


def GetSoup(url):
    resp = requests.get(url, headers=headers)
    resp.encoding = 'gbk'
    soup = BeautifulSoup(resp.text, 'lxml')
    return soup


# 装备
url2 = "https://pvp.qq.com/web201605/item.shtml"
start = time.time()
soup = GetSoup(url2)
alldiv2 = soup.find_all('a', href='#none')
for div in alldiv2:
    url3 = 'https:' + div.find('img')['src']
    title = div.find('img')['alt']
    resp2 = requests.get(url3, headers=headers)
    with open('./Goods/%s.jpg' % title, 'wb') as f:
        f.write(resp2.content)
    print('《%s》下载完成！' % title)

print('\n本次总耗时{0:.2f}秒\t相当于{1:.2f}分钟'.format((time.time() - start), (time.time() - start) / 60))
