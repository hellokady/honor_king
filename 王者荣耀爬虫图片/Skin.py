import re
import time
import requests
# url编码和解码
from urllib import parse
import threading

headers = {
	# 自行添加
    'cookie':'',
    'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
}
start = time.time()
try:
    count = 0
    countPage = 24
    for page in range(0, countPage):
        url = 'https://apps.game.qq.com/cgi-bin/ams/module/ishow/V1.0/query/workList_inc.cgi?activityId=2735&sVerifyCode=ABCD&sDataType=JSON&iListNum=20&totalpage=0&page={0}&iOrder=0&iSortNumClose=1&jsoncallback=jQuery171049106997163594523_1606960309787&iAMSActivityId=51991&_everyRead=true&iTypeId=2&iFlowId=267733&iActId=2735&iModuleId=2735&_=1606960310077'.format(
            page)
        response  =requests.get(url, headers=headers, timeout= 3)
        if response.status_code == 200:
            html = response.text
        # print(html)

        # 正则解析数据
        nameList = re.findall(r'"sProdName":(.*?),', html)
        urlList = re.findall(r'"sProdImgNo_6":(.*?),', html)
        # 循环读取总页数
        if page == 1:
            cPage = re.findall(r'"iTotalPages":(.*?),', html)
            cPage = ''.join(cPage).replace('"','')
            countPage = int(cPage)
        print('\n第{0}页\n'.format(page+1))
        for name, url in zip(nameList, urlList):
            # 解码、格式化
            name = parse.unquote(name).replace('"', '')
            url = parse.unquote(url).replace('"', '')[:-3]+ '0'
            # 为什么要这么做？经过解析后的url后面是200，会导致部分图片下载异常，如：后裔-如梦令，所以直接手动改为0
            
            print('{0}、{1}    已获取!\n'.format((count+1),name))
            fileName = name+ '.jpg'
            # print(filename)
            with open('./Skins/' + fileName, 'wb') as file:
                img_url = requests.get(url)
                # 过滤部分无法访问图片
                if img_url.status_code ==200:
                    file.write(img_url.content)
                    count = count+ 1

    print('获取结束\n本次获取{0}页,{1}张图片!'.format(countPage, count))
    
except KeyboardInterrupt:
    print('非正常退出')
finally:
    print('\n本次总耗时{0:.2f}秒\t相当于{1:.2f}分钟'.format((time.time() - start), (time.time() - start) / 60))