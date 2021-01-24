import requests
import time

# url to get html, include every hero's info
url = 'https://pvp.qq.com/web201605/js/herolist.json'
headers = {
	# 自行添加
    'cookie':'',
    'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
}
# path to get image of each hero
imagePath = "https://game.gtimg.cn/images/yxzj/img201606/heroimg/"
start = time.time()
if __name__ == '__main__':
    html = requests.get(url, headers=headers)
    for i in range(len(html.json())):
        id = html.json()[i]['ename']
        name = html.json()[i]['cname']
        # skinName = html.json()[i]['skin_name'].split('|') # 皮肤名称
        newUrl = imagePath + str(id) + "/" + str(id) + ".jpg"
        image = requests.get(newUrl, headers=headers).content
        with open( './Heros/'+ name + ".jpg", 'wb') as f:
            f.write(image)
        print('《%s》下载完成！' %name)
print('\n本次总耗时{0:.2f}秒\t相当于{1:.2f}分钟'.format((time.time() - start), (time.time() - start) / 60))
