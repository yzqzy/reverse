# encoding=utf-8
import base64
import json
import ddddocr

from PIL import Image
from io import BytesIO
from flask import Flask, request

app = Flask(__name__)


def save_img(image_data, output_path):
    try:
        image_stream = BytesIO(image_data)
        image = Image.open(image_stream)
        image.save(f'{output_path}.png')
        return True
    except Exception as e:
        print("Error:", e)
        return False


def get_img(request, img_name='image'):
    dic = request.get_json()

    try:  # json str of multiple images
        img = base64.b64decode(dic.get(img_name).encode())
    except Exception as e:  # just base64 of single image
        pass

    return img


def set_ret(result):
    if isinstance(result, Exception):
        return json.dumps({'status': 200, 'result': '', 'msg': str(result)})
    else:
        return json.dumps({'status': 200, 'result': result, 'msg': ''})


def get_jd_slide_path(dddd, bg, slide):
    # 转换成 Iamge
    background_img = Image.open(BytesIO(bg))
    target_img = Image.open(BytesIO(slide))
    # 重新设定宽高
    background_img_resize = background_img.resize((242, 94))
    target_img_resize = target_img.resize((33, 33))
    # 转换成 byte
    bg_byte = BytesIO()
    tg_byte = BytesIO()
    background_img_resize.save(bg_byte, format='PNG')
    target_img_resize.save(tg_byte, format='PNG')
    # 滑动验证
    res = dddd.slide_match(tg_byte.getvalue(),
                           bg_byte.getvalue(), simple_target=True)
    # 返回结果
    return res


@app.route('/slide/<algo_type>', methods=['POST'])
def slide(algo_type='compare'):
    dddd = ddddocr.DdddOcr(det=False, ocr=False)

    try:
        target_src = get_img(request, 'target_src')
        background_src = get_img(request, 'background_src')

        result = ''
        match(algo_type):
            case 'match':
                result = get_jd_slide_path(dddd, background_src, target_src)
            case 'compare':
                result = dddd.slide_comparison(target_src, background_src)
            case _:
                raise Exception(f'不支持的滑块算法类型: {algo_type}')

        return set_ret(result)
    except Exception as e:
        return set_ret(e)


@app.route('/ping', methods=['GET'])
def ping():
    return set_ret('pong')


if __name__ == '__main__':
    app.run()
