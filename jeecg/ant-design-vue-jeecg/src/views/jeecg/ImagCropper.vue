<template>
  <div class="wrapper">
    <div v-show="model" class="model">
      <div class="model-show" @click="model = false">
        <img :src="modelSrc" alt="" @click="model = false">
      </div>
    </div>
    <div class="content">
      <div class="show-info">
        <div class="test test1">
          <vueCropper
            ref="cropper"
            :autoCrop="option.autoCrop"
            :autoCropHeight="option.autoCropHeight"
            :autoCropWidth="option.autoCropWidth"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :centerBox="option.centerBox"
            :enlarge="option.enlarge"
            :fixedBox="option.fixedBox"
            :full="option.full"
            :high="option.high"
            :img="option.img"
            :info="true"
            :infoTrue="option.infoTrue"
            :limitMinSize="option.limitMinSize"
            :maxImgSize="option.maxImgSize"
            :mode="option.mode"
            :original="option.original"
            :outputSize="option.size"
            :outputType="option.outputType"
            @cropMoving="cropMoving"
            @imgLoad="imgLoad"
            @realTime="realTime"
          ></vueCropper>
        </div>
        <div class="test-button">
          <button class="btn" @click="changeImg">changeImg</button>
          <label class="btn" for="uploads">upload</label>
          <input id="uploads" ref="uploadImg" accept="image/png, image/jpeg, image/gif, image/jpg" style="position:absolute; clip:rect(0 0 0 0);" type="file" @change="uploadImg($event, 1)">
          <button v-if="!crap" class="btn" @click="startCrop">start</button>
          <button v-else class="btn" @click="stopCrop">stop</button>
          <button class="btn" @click="clearCrop">clear</button>
          <button class="btn" @click="refreshCrop">refresh</button>
          <button class="btn" @click="changeScale(1)">+</button>
          <button class="btn" @click="changeScale(-1)">-</button>
          <button class="btn" @click="rotateLeft">rotateLeft</button>
          <button class="btn" @click="rotateRight">rotateRight</button>
          <button class="btn" @click="finish('base64')">preview(base64)</button>
          <button class="btn" @click="finish('blob')">preview(blob)</button>
          <button class="btn" @click="() => option.img = ''">????????????</button>
          <a class="btn" @click="down('base64')">download(base64)</a>
          <a class="btn" @click="down('blob')">download(blob)</a>
          <a ref="downloadDom" :href="downImg" download="demo.png"></a>
        </div>

        <div class="pre">
          <section class="pre-item">
            <p>???????????????</p>
            <div :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
							'margin': '5px'}" class="show-preview">
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </section>

          <section class="pre-item">
            <p>????????????</p>
            <div :style="previewStyle1">
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </section>

          <section class="pre-item">
            <p>????????????</p>
            <div :style="previewStyle2">
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </section>

          <section class="pre-item" title="zoom: (100 / previews.w)">
            <p>?????????100??????</p>
            <div :style="previewStyle3">
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </section>

          <section class="pre-item" title="zoom: (100 / previews.h)">
            <p>?????????100??????</p>
            <div :style="previewStyle4">
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </section>
        </div>

        <div style="display:block; width: 100%;">
          <label class="c-item">
            <span>????????????????????????</span>
            <select v-model="option.mode">
              <option value="contain">contain</option>
              <option value="cover">cover</option>
              <option value="400px auto">400px auto</option>
              <option value="auto 400px">auto 400px</option>
              <option value="50%">50%</option>
              <option value="auto 50%">auto 50%</option>
            </select>
            <section>
              ??????css background????????????  ????????????????????????????????? ??????????????????
            </section>
          </label>
          <label class="c-item">
            <span>???????????????????????????(????????????????????????????????????)</span>
            <input v-model="option.maxImgSize" type="nubmer">
          </label>
          <label class="c-item">
            <span>???????????????????????????????????? (???????????? ????????????)</span>
            <input v-model="option.original" type="checkbox">
            <span>original: {{ option.original}}</span>
          </label>
          <label class="c-item">
            <span>????????????dpr?????????????????????????????????</span>
            <input v-model="option.high" type="checkbox">
            <span>high: {{ option.high}}</span>
          </label>
          <label class="c-item">
            <span>?????????????????????????????????</span>
            <input v-model="option.full" type="checkbox">
            <span>full: {{ option.full}}</span>
          </label>
          <label class="c-item">
            <span>????????????????????????????????????????????????</span>
            <input v-model="option.infoTrue" type="checkbox">
            <span>infoTrue: {{ option.infoTrue}}</span>
          </label>
          <label class="c-item">
            <span>??????????????????</span>
            <input v-model="option.canMove" type="checkbox">
            <span>canMove: {{ option.canMove}}</span>
          </label>
          <label class="c-item">
            <span>?????????????????????</span>
            <input v-model="option.canMoveBox" type="checkbox">
            <span>canMoveBox: {{ option.canMoveBox}}</span>
          </label>
          <label class="c-item">
            <span>?????????????????????</span>
            <input v-model="option.fixedBox" type="checkbox">
            <span>fixedBox: {{ option.fixedBox}}</span>
          </label>
          <label class="c-item">
            <span>???????????????????????????</span>
            <input v-model="option.autoCrop" type="checkbox">
            <span>autoCrop: {{ option.autoCrop}}</span>
          </label>
          <label class="c-item">
            <span>??????????????????????????????</span>
            <span>??????:  </span><input v-model="option.autoCropWidth" type="number">
            <span>??????:  </span><input v-model="option.autoCropHeight" type="number">
          </label>
          <label class="c-item">
            <span>?????????????????????????????????(?????????????????????????????????????????????)</span>
            <input v-model="option.centerBox" type="checkbox">
            <span>centerBox: {{ option.centerBox}}</span>
          </label>
          <label class="c-item">
            <span>????????????????????????????????? ?????????1 </span>
            <input v-model="option.enlarge" type="number">
          </label>
          <p>??????????????????</p>
          <label class="c-item">
            <label>jpg  <input v-model="option.outputType" name="type" type="radio" value="jpeg"></label>
            <label>png  <input v-model="option.outputType" name="type" type="radio" value="png"></label>
            <label>webp <input v-model="option.outputType" name="type" type="radio" value="webp"></label>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { VueCropper } from 'vue-cropper'

  export default {
    name: 'ImagCropper',
    components: {
      VueCropper
    },
    data () {
      return {
        model: false,
        modelSrc: "",
        crap: false,
        previews: {},
        lists: [
          {img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4"},
          {img: "http://cdn.xyxiao.cn/Landscape_1.jpg"},
          {img: "http://cdn.xyxiao.cn/Landscape_2.jpg"},
          {img: "http://cdn.xyxiao.cn/Landscape_3.jpg"},
          {img: "http://cdn.xyxiao.cn/Landscape_4.jpg"},
          {img: "http://cdn.xyxiao.cn/Portrait_1.jpg"},
          {img: "http://cdn.xyxiao.cn/Portrait_2.jpg"}
        ],
        option: {
          img: "",
          size: 1,
          full: false,
          outputType: "png",
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // ???????????????????????? ?????????????????????
          autoCropWidth: 200,
          autoCropHeight: 150,
          centerBox: false,
          high: false,
          cropData: {},
          enlarge: 1,
          mode: 'contain',
          maxImgSize: 3000,
          limitMinSize: [100, 120]
        },
        example2: {
          img: "http://cdn.xyxiao.cn/Landscape_2.jpg",
          info: true,
          size: 1,
          outputType: "jpeg",
          canScale: true,
          autoCrop: true,
          // ???????????????????????? ?????????????????????
          autoCropWidth: 300,
          autoCropHeight: 250,
          fixed: true,
          // ?????????????????????
          infoTrue: true,
          fixedNumber: [4, 3]
        },
        example3: {
          img: "http://cdn.xyxiao.cn/Landscape_1.jpg",
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          fixedBox: true
        },
        downImg: "#",
        previewStyle1: {},
        previewStyle2: {},
        previewStyle3: {},
        previewStyle4: {},
        code0: '',
        code1: '',
        code2: '',
        code3: '',
        preview3: '',
      };
    },
    methods: {
      changeImg() {
        this.option.img = this.lists[~~(Math.random() * this.lists.length)].img;
      },
      startCrop() {
        // start
        this.crap = true;
        this.$refs.cropper.startCrop();
      },
      stopCrop() {
        //  stop
        this.crap = false;
        this.$refs.cropper.stopCrop();
      },
      clearCrop() {
        // clear
        this.$refs.cropper.clearCrop();
      },
      refreshCrop() {
        // clear
        this.$refs.cropper.refresh();
      },
      changeScale(num) {
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      },
      rotateLeft() {
        this.$refs.cropper.rotateLeft();
      },
      rotateRight() {
        this.$refs.cropper.rotateRight();
      },
      finish(type) {
        if (type === "blob") {
          this.$refs.cropper.getCropBlob(data => {
            var img = window.URL.createObjectURL(data);
            this.model = true;
            this.modelSrc = img;
          });
        } else {
          this.$refs.cropper.getCropData(data => {
            this.model = true;
            this.modelSrc = data;
          });
        }
      },
      // ??????????????????
      realTime(data) {
        var previews = data;
        var h = 0.5;
        var w = 0.2;

        this.previewStyle1 = {
          width: previews.w + "px",
          height: previews.h + "px",
          overflow: "hidden",
          margin: "0",
          zoom: h
        };

        this.previewStyle2 = {
          width: previews.w + "px",
          height: previews.h + "px",
          overflow: "hidden",
          margin: "0",
          zoom: w
        };

        this.previewStyle3 = {
          width: previews.w + "px",
          height: previews.h + "px",
          overflow: "hidden",
          margin: "0",
          zoom: (100 / previews.w)
        };

        this.previewStyle4 = {
          width: previews.w + "px",
          height: previews.h + "px",
          overflow: "hidden",
          margin: "0",
          zoom: (100 / previews.h)
        };

        this.previews = data;
      },

      finish2(type) {
        this.$refs.cropper2.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      },
      finish3(type) {
        this.$refs.cropper3.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      },
      down(type) {
        // ??????
        if (type === "blob") {
          this.$refs.cropper.getCropBlob(data => {
            this.downImg = window.URL.createObjectURL(data);
            if (window.navigator.msSaveBlob) {
              var blobObject = new Blob([data]);
              window.navigator.msSaveBlob(blobObject, "demo.png");
            } else {
              this.$nextTick(() => {
                this.$refs.downloadDom.click();
              });
            }
          });
        } else {
          this.$refs.cropper.getCropData(data => {
            this.downImg = data;
            if (window.navigator.msSaveBlob) {
              var blobObject = new Blob([data]);
              window.navigator.msSaveBlob(blobObject, "demo.png");
            } else {
              this.$nextTick(() => {
                this.$refs.downloadDom.click();
              });
            }
          });
        }
      },

      uploadImg(e, num) {
        //????????????
        // this.option.img
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert("?????????????????????.gif,jpeg,jpg,png,bmp????????????");
          return false;
        }
        var reader = new FileReader();
        reader.onload = e => {
          let data;
          if (typeof e.target.result === "object") {
            // ???Array Buffer?????????blob ?????????base64?????????
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }
          if (num === 1) {
            this.option.img = data;
          } else if (num === 2) {
            this.example2.img = data;
          }
          this.$refs.uploadImg.value = ''
        };
        // ?????????blob
        reader.readAsArrayBuffer(file);
      },
      imgLoad(msg) {
        console.log(msg);
      },

      cropMoving(data) {
        this.option.cropData = data;
      }
    },
    components: {
      VueCropper
    },
    mounted() {
      this.changeImg();
      var list = [].slice.call(document.querySelectorAll("pre code"));
      list.forEach((val, index) => {
        hljs.highlightBlock(val);
      });
    }
  };
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .content {
    margin: auto;
    max-width: 1200px;
    margin-bottom: 100px;
  }

  .test-button {
    display: flex;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all 0.2s ease;
    text-decoration: none;
    user-select: none;
  }

  .des {
    line-height: 30px;
  }

  code.language-html {
    padding: 10px 20px;
    margin: 10px 0px;
    display: block;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo,
    Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
    white-space: pre;
  }

  .show-info {
    margin-bottom: 50px;
  }

  .show-info h2 {
    line-height: 50px;
  }

  .title {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 1.5;
    margin: 20px 0px;
    background-image: -webkit-linear-gradient(
      left,
      #3498db,
      #f47920 10%,
      #d71345 20%,
      #f7acbc 30%,
      #ffd400 40%,
      #3498db 50%,
      #f47920 60%,
      #d71345 70%,
      #f7acbc 80%,
      #ffd400 90%,
      #3498db
    );
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
    font-size: 40px;
  }

  .test {
    height: 500px;
  }

  .model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
  }

  .model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    text-align: center;
  }

  .model img {
    display: block;
    margin: auto;
    max-width: 80%;
    width: auto;
    user-select: none;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  }

  .c-item {
    display: block;
    padding: 10px 0;
    user-select: none;
  }

  .pre {
    display: flex;
    flex-wrap: wrap;
  }

  .pre-item {
    padding-right: 20px;
  }

  @keyframes slide {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  @media screen and (max-width: 1000px) {
    .content {
      max-width: 90%;
      margin: auto;
    }

    .test {
      height: 400px;
    }
  }
</style>
