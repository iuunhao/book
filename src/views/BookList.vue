<template>
  <div>
    <div class="wrap">
      <div class="comment" :class="replyPop ? 'replyPop':''">
        <div class="commentMain">
          <div class="textareaBox">
            <textarea v-model="text" class="textarea" placeholder="写下你想说的，开始我们的对话" @click="toogleSmilePop()"></textarea>
          </div>
          <div class="commentinfos">
            <div class="commentinfos__item">
              <div class="smile">
                <a class="smile__btn" @click="smilePop" href="javascript:;"><img class="icon " :src="'static/' + smileBtnUrl" alt=""></a>
                <div class="smile__items" v-if="isShowSmilePop">
                  <a class="smile__link" v-for="(smile, index) in smiles.lists" @click="smileFunc(smile, index)" href="javascript:;" title="微笑">
                        <img class="smile__img" v-lazy="smiles.url + smile.en + smiles.suffix" :alt="smile.name">
                    </a>
                </div>
              </div>
              <div class="picture" v-if="!replyPop">
                <a class="picture__btn" href="javascript:;">
                  <input class="file" @change="upfile" @click="toogleSmilePop" name="image" ref="inputer" type="file">
                  <img class="icon " src="static/img.svg" alt=""></a>
                <img v-if="fileBase64" class="picture__preview " :src="fileBase64" alt="">
              </div>
            </div>
            <div class="commentinfos__item">
              <div class="userNmae" v-if="!isRoot">
                <img class="icon" src="static/user.svg" alt="">
                <input class="userNmae__inp" placeholder="昵称" @click="toogleSmilePop()" v-model="name" type="text" maxLength="5" value="熊宝宝">
              </div>
              <div class="submit">
                <a class="submit__btn" @click="send" :class="disable ? 'disable' : ''" href="javascript:;">发布</a>
              </div>
            </div>
          </div>
        </div>
        <div class="replyMsk" @click="hiddenReply"></div>
      </div>
      <div class="comments" :class="replyPop ? 'blur': ''">
        <div class="comments__item commentsItem" v-if="showAll ? true : item.isShow" v-for="(item, index) in getList">
          <div class="commentsItem__head">
            <div class="commentsHead__item">
              <div class="avatar" @click="findUser(item.name)">
                <img class="avatar__img" v-lazy="'../../static/userImgs/' + item.avatar" alt="">
              </div>
              <div class="userInfos">
                <div class="userInfos__name">{{item.name}}</div>
                <div class="userInfos__date">{{new Date(item.createDate).Format("MM月dd日 hh:mm:ss")}}</div>
              </div>
            </div>
            <div class="commentsHead__item">
              <div class="floor">{{item.floor + 1}}</div>
            </div>
          </div>
          <div class="commentsItem__content" v-html="msgInit({msg: item.message, sm: item.smilesArray})">
          </div>
          <div class="commentsItem__contentImgBox" v-if="item.image">
            <img class="commentsItem__contentImg" v-lazy="item.image" alt="">
            <div class="commentsItem__bg"></div>
          </div>
          <div class="commentsItem__info">
            <div class="commentsInfo operation" v-if="isRoot">
              <a class="operation__btn" @click="hiddenItem(item._id, item.isShow)" href="javascript:;">隐藏-{{item.isShow}}</a>
              <a class="operation__btn" @click="removeItem({id: item._id, floor: item.floor})" href="javascript:;">删除</a>
              <a class="operation__btn" @click="replyPopFunc({id: item._id, name: item.name})" href="javascript:;">回复</a>
            </div>
            <div class="platform">{{item.client}}</div>
            <div class="commentsInfo">
              <div class="address">
                河北 · 唐山</div>
            </div>
          </div>
          <div class="replyMsg" v-if="item.reply">
            <div class="avatar">
              <img class="avatar__img" v-lazy="'../../static/userImgs/' + item.reply.avatar" alt="" />
            </div>
            <div class="replyMain">
              <span class="author">{{item.reply.name}}:</span>
              <div class="replyText" v-html="msgInit({msg: item.reply.message})"></div>
              <div class="replyDate">于 {{new Date(item.reply.createDate).Format("MM月dd日 hh:mm:ss")}}</div>
            </div>
          </div>
        </div>
        <div class="loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="40">
          <p class="noData" v-if="noData">你很有耐心，已经看到了所有信息！！</p>
        </div>
      </div>
      <img v-if="isShowLoading" class="loadingImg" src="../../static/loading/loading-bubbles.svg" alt="">
      <div class="tips" v-if="isShowTips">
        <div class="tips__msg"><em class="tips__num">{{findLen}}</em>条关于<span class="tips__name">{{findUserName}}</span>的消息</div>
        <a class="tips__close" href=""><img class="tips__icon" src="static/close_bai.svg" alt=""></a>
      </div>
    </div>
    <div class="footer">
      <p>版权所有</p>
      <p>Copyright © WNCSS.com. All Rights Reserved.</p>
    </div>
    <modal-box v-if="isShowModal" :opts="modalOpts" @callback="callbackFunc"></modal-box>
  </div>
</template>
<style scoped lang="less">


</style>
<script>
import axios from 'axios';
import ModalBox from '../components/ModalBox';
import dateFormat from '../utils/dateFormat';
import smiles from '../data/smiles';
export default {
  name: 'BookList',
  components: {
    ModalBox
  },
  filters: {},
  data() {
    return {
      disable: false,
      isShowSmilePop: false,
      isShowTips: false,
      findLen: 0,
      smiles: smiles,
      text: '',
      name: '',
      image: '',
      accessory: '',
      lists: [],
      showAll: false,
      count: 0,
      page: 0,
      findUserName: '',
      pageNumber: 10,
      busy: false,
      isShowModal: false,
      delId: '',
      smileBtnUrl: 'smail.svg',
      smilesArray: [],
      file: '',
      noData: false,
      uploadToken: '',
      fileBase64: '',
      replyPop: false,
      isReply: false,
      replyVal: {},
      isShowLoading: true,
      modalOpts: {
        msg: '',
        btns: [{
          name: '确定',
          event: 'confirm'
        }, {
          name: '取消',
          event: 'cancel'
        }],
        vertical: 'center'
      }
    }
  },
  props: [
    "isRoot"
  ],
  mounted() {
    this.addInterceptors();
  },
  computed: {
    getList() {
      return this.lists.sort((a, b) => {
        return b.floor - a.floor;
      })
    }
  },
  methods: {
    addInterceptors() {
      axios.interceptors.request.use(config => {
        this.isShowLoading = true;
        return config;
      }, (error) => {
        return Promise.reject(error);
      })
      axios.interceptors.response.use(config => {
        this.isShowLoading = false;
        return config;
      }, (error) => {
        return Promise.reject(error);
      })
    },
    getInit() {
      this.getUpToken();
      this.isShowLoading = true;
      axios.get('/api/comments', {
          params: {
            page: this.page,
            pageNumber: this.pageNumber
          }
        })
        .then((response) => {
          let res = response.data;
          if (res.status === "0") {
            if (res.result.count === 0) {
              this.isShowLoading = false;
              this.noData = true;
              return;
            } else {
              this.lists.unshift(...res.result.list);
              this.busy = false;
            }
          }
        });
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getInit();
      }, 1000);
    },
    getUpToken() {
      axios.get("/api/comments/token").then(response => {
        let res = response.data;
        if (res.status === '0') {
          this.uploadToken = res.result.token;
        } else {
          console.log(res.msg)
        }
      })
    },
    nullNameModal() {
      this.isShowModal = true;
      this.modalOpts = {
        msg: ` 请正确填写内容然后提交!`,
        vertical: 'center',
        btns: [{
          name: '确定',
          event: 'confirm'
        }],
        name: 'nameNull'
      };
      setTimeout(() => {
        this.isShowModal = false;
      }, 2000);
    },
    imgUpModal() {
      this.isShowModal = true;
      this.modalOpts = {
        msg: ` 正在上传图片请稍等!`,
        vertical: 'center',
        btns: [{
          name: '确定',
          event: 'confirm'
        }],
        name: 'nameNull'
      };
      setTimeout(() => {
        this.isShowModal = false;
      }, 2000);
    },
    send() {
      let avatar = '';

      this.toogleSmilePop();
      this.replyPop = false;

      if (this.isReply) {
        this.replyPopSend();
        return;
      };
      if (this.isRoot) {
        if (!this.text) {
          this.nullNameModal();
          return;
        }
      } else if (!this.name || !this.text) {
        this.nullNameModal();
        return;
      }

      if ((!/^http:\/\/ouaxlr8d6\.bkt\.clouddn\.com\//.test(this.image)) && (this.file !== '')) {
        this.imgUpModal();
        return;
      }
      axios.post('/api/comments/add', {
          name: this.name,
          avatar: `user_0${Math.round(Math.random()*6+1)}.jpg`,
          message: this.text,
          image: this.image,
          accessory: this.accessory,
          isShow: true,
          floor: this.lists.length,
          smilesArray: this.smilesArray,
          client: this.clientType(),
          isAdmin: this.isRoot
        })
        .then((response) => {
          this.image = '';
          this.file = '';
          this.fileBase64 = '';
          this.isShowTips = false;
          this.text = '';
          this.getInit();
        })
        .catch((error) => { console.log(error); });
    },
    hiddenItem(id, isShow) {
      axios.post('/api/comments/hidden', {
          id: id,
          isShow: !isShow
        })
        .then((response) => {
          this.getInit();
          console.log(response);
        }).catch((error) => { console.log(error); });
    },
    all() {
      this.showAll = !this.showAll;
      this.getInit();
    },
    removeItem(opts) {
      this.delId = opts.id;
      this.isShowModal = true;
      this.modalOpts = {
        msg: `你确定要删除 <em class="highlight">[${opts.floor}楼]</em> 这条记录吗？`,
        vertical: 'center',
        btns: [{
          name: '确定',
          event: 'confirm'
        }, {
          name: '取消',
          event: 'cancel'
        }],
        name: 'delItem'
      }
    },
    delModalConfirm() {
      axios.post("/api/comments/remove", {
        id: this.delId
      }).then(res => {
        this.lists.forEach((item, index) => {
          if (item._id === this.delId) this.lists.splice(index, 1)
        })
      }).catch((error) => {});
    },
    callbackFunc(ops) {
      this.isShowModal = false;
      if ((ops.name === 'delItem') && (ops.evName === 'confirm')) this.delModalConfirm();
    },
    smilePop() {
      this.isShowSmilePop = !this.isShowSmilePop;
      this.smileBtnUrl = this.isShowSmilePop ? 'close.svg' : 'smail.svg';
    },
    smileFunc(item, index) {
      this.text += `[:${item.name}:${index}]`;
    },
    msgInit(opts) {
      return opts.msg.replace(/\[\:([\u4e00-\u9fa5]+)\:(\d+)\]/g, ($1, $2, $3) => {
        return `<img class="smileIcon" src="${this.smiles.url}${this.smiles.lists[$3].en}${this.smiles.suffix}" alt="${this.smiles.lists[$3].name}" />`
      })
    },
    findUser(name) {
      this.lists = [];
      this.page = 1;
      this.findUserName = name;
      this.toogleSmilePop();
      axios.get("/api/comments/finduser", {
        params: {
          name: name,
          page: this.page,
          pageNumber: this.pageNumber
        }
      }).then(res => {
        this.lists = res.data.result.list;
        this.isShowTips = true;
        this.findLen = res.data.result.count;
      })
    },
    putb64(pic) {
      let _this = this,
        reg = /data:image\/(png|jpeg|gif);base64,/,
        newPic = pic.replace(reg, ''),
        url = "http://up-z2.qiniu.com/putb64/-1",
        xhr = new XMLHttpRequest(),
        xhrget = new XMLHttpRequest(),
        obj;
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log('aaa');
          let url = JSON.parse(xhr.response).hash;
          (function() {
            _this.image = "http://ouaxlr8d6.bkt.clouddn.com/" + url;
          }())
        }
      }
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.setRequestHeader("Authorization", "UpToken " + this.uploadToken);
      xhr.send(newPic);
    },
    upfile() {
      let _this = this;
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0];
      if (!this.file || !window.FileReader) return;
      if (/^image/.test(this.file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onloadend = () => {
          _this.fileBase64 = reader.result;
          _this.putb64(this.fileBase64);
        }
      } else {
        this.isShowModal = true;
        this.modalOpts = {
          msg: `只限上传图片哦`,
          vertical: 'center',
          btns: [{
            name: '确定',
            event: 'confirm'
          }],
          name: 'imgModal'
        }
      }
    },
    clientType() {
      let userAgentInfo = navigator.userAgent,
        Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
        flag = true;
      Agents.forEach(item => { if (userAgentInfo.indexOf(item) > 0) flag = false; })
      if (flag) return '桌面版';
      return '移动版'
    },
    toogleSmilePop() {
      this.isShowSmilePop = false;
      this.smileBtnUrl = 'smail.svg';
    },
    replyPopFunc(opts) {
      this.isReply = true;
      this.replyPop = true;
      this.replyVal = opts;
    },
    replyPopSend(opts) {
      this.toogleSmilePop();
      this.replyPop = true;
      if (!this.text) {
        this.isShowModal = true;
        this.modalOpts = {
          msg: ` 请正确填写内容然后提交!`,
          vertical: 'center',
          btns: [{
            name: '确定',
            event: 'confirm'
          }],
          name: 'nameNull'
        }
        setTimeout(() => {
          this.isShowModal = false;
        }, 2000);
        return;
      } else {
        axios.post("/api/comments/reply", {
          id: this.replyVal.id,
          msg: this.text
        }).then(res => {
          this.lists = [];
          this.getInit();
          this.isReply = false;
          this.replyPop = false;
          this.text = '';
        })
      }
    },
    hiddenReply() {
      this.replyPop = false;
      console.log('obj');
    }
  }
}

</script>
