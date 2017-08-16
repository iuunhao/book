<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}

</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-style: none;
  outline: none;
  border: none;
  line-height: normal;
  color: #333;
  font-family: STHeitiSC-Light;
}

input::input-placeholder {
  line-height: normal;
}

input::focus {
  background: none;
}

a {
  text-decoration: none;
  color: #333;
}

.highlight {
  color: #f80;
  font-style: normal;
}

html,
body {
  height: 100%;
}

body {
  background: #EAEAEA;
  -webkit-text-size-adjust: none;
  font-family: STHeitiSC-Light;
}

.icon {
  width: 100%;
}

.wrap {
  max-width: 750px;
  margin: 0 auto;
}

.comments {
  &__item {
    margin-bottom: 6px;
    background: #F6F6F6;
    padding: 12px 12px 0 12px;
    border-bottom: 1px solid #E3E3E3;
  }
}

.commentsItem {
  position: relative;
  &__head {
    display: flex;
    justify-content: space-between; // align-items: center;
    margin-bottom: 10px;
  }
  &__content {
    font-size: 15px;
    color: #444;
    line-height: 1.6;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .commentsItem__contentImg {
    display: block;
    border-radius: 4px;
    width: 100%;
    margin: 8px 0 4px;
    border-radius: 4px;
  }
  .commentsItem__contentImgBox {
    // background: #a0a0a0;
    position: relative;
    border-radius: 4px;
  }
  .commentsItem__contentImg[lazy=loading] {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 30px;
    height: 30px;
  }
  .commentsItem__bg {
    background: #a0a0a0;
    height: 300px;
    width: 100%;
    border-radius: 4px;
  }
  .commentsItem__contentImg[lazy=loaded]+.commentsItem__bg {
    height: auto;
  }
}

.commentsHead__item {
  display: flex;
  .floor {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 24px;
    color: #ddd;
    font-weight: bold;
    font-family: "TrebuchetMS";
    letter-spacing: -2px;
  }
}

.avatar {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  &__img {
    display: block;
    width: 100%;
    border-radius: 100%;
  }
}

.userInfos {
  &__name {
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: bold;
    line-height: 1;
  }
  &__date {
    font-size: 10px;
    color: #999;
  }
}

.commentsItem__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.commentsInfo {
  display: flex;
  font-size: 10px;
  color: #999;
  .address {
    color: #999;
  }
}

.platform {
  font-size: 10px;
  color: #999;
}

.operation {
  display: flex;
  &__btn {
    display: block;
    font-size: 10px;
    margin-right: 5px;
    padding: 2px 10px;
    background: #efefef;
    color: #b9b9b9;
    border-radius: 2px;
  }
}

.replyMsg {
  padding: 12px;
  background: #F8F8F8;
  margin: 0 -12px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 6px rgba(0, 0, 0, .06);
  .avatar {}
  .replyText {
    // display: inline-block;
    display: inline;
  }
}

.replyMain {
  flex: 1;
  font-size: 14px;
  color: #444;
  line-height: 1.6;
  .author {
    color: #f80;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    border-radius: 100px;
    line-height: 1.6;
  }
  .replyDate {
    font-size: 10px;
    color: #999;
    margin-top: 4px;
  }
  .replyEidt {
    display: inline-block;
    font-size: 10px;
    margin-left: 5px;
    padding: 2px 10px;
    background: #efefef;
    color: #b9b9b9;
    border-radius: 2px;
  }
}

.comment {
  margin-bottom: 6px;
  background: #F9F9F9;
  box-shadow: 0 0 6px rgba(0, 0, 0, .06);
  border-bottom: 1px solid #E3E3E3;
}

.textareaBox {
  display: flex;
  .textarea {
    padding: 12px;
    flex: 1;
    resize: none;
    height: 100px;
    background: none;
    font-size: 14px;
    color: #444;
    ovherflow-y: auto;
    line-height: 1.6;
    font-family: STHeitiSC-Light;
  }
}

.commentinfos {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  &__item {
    display: flex;
    align-items: center;
  }
}

.smile {
  margin-right: 24px;
  margin-left: 10px;
  position: relative;
  &__btn {
    display: flex;
    width: 20px;
    height: 20px;
  }
  &__items {
    position: absolute;
    z-index: 2;
    left: -12px;
    margin-top: 12px;
    background: rgba(255, 255, 255, 14);
    box-shadow: 0 0 22px rgba(0, 0, 0, 0.2);
    padding: 12px;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    width: 366px;
  }
  .smile__link {
    display: block;
    width: 32px;
    padding: 12px;
  }
  .smile__img {
    display: block;
    max-width: 100%;
  }
}

.smileIcon {
  display: inline-block;
  width: 24px;
  margin-bottom: -6px;
  font-size: 0;
}

.picture {
  position: relative;
  z-index: 1;
  &__btn {
    display: flex;
    height: 35px;
    width: 24px;
    height: 24px;
    position: relative;
  }
  &__preview {
    position: absolute;
    width: 120px;
    border-radius: 4px;
    padding: 2px;
    background: #fff;
    box-shadow: 0 0 22px rgba(0, 0, 0, .2);
    z-index: 2;
  }
  .file {
    position: absolute;
    background: red;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    width: 24px;
    height: 24px;
  }
}

.submit {
  &__btn {
    display: block;
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 100px;
    background: linear-gradient(to right, #888888 0, #555555 100%);
    color: #fff;
    width: 70px;
    text-align: center;
  }
}

.userNmae {
  height: 35px;
  display: flex;
  align-items: center;
  background: #eee;
  margin-right: 10px;
  border-radius: 100px;
  position: relative;
  .icon {
    width: 16px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  &__inp {
    width: 80px;
    flex: 1;
    display: block;
    background: none;
    padding-right: 10px;
    font-size: 14px;
    margin: 0 12px;
    margin-left: 2.5em;
  }
}

.tips {
  position: fixed;
  background: linear-gradient(to right, #666666 0, #555555 100%);
  bottom: 12px;
  left: 12px;
  right: 12px;
  opacity: 0.97;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .60);
  color: #fff;
  &__close {
    position: absolute;
    display: flex;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    opacity: .8;
    ovherflow: hidden;
  }

  &__msg {
    color: #aaa;
    font-family: STHeitiSC-Light;
    display: flex;
    align-items: center;
    padding: 5px 12px;
  }
  &__num {
    color: #fff;
    font-weight: bold;
    font-style: normal;
    margin-right: 5px;
    font-family: "TrebuchetMS";
    font-size: 22px;
  }
  &__name {
    color: #fff;
    font-weight: bold;
    margin: 0 5px;
  }
  &__icon {
    width: 20px;
    display: block;
    height: 20px;
  }
}



.replyComment {
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0; // background: rgba(255, 255, 255, 8);
  background: red;
  .textarea {
    border-radius: 0;
    font-size: 16px;
  }
  .commentinfos {
    border-top: 1px solid #d7d7d;
    z-index: 200;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

.modalBox {
  position: fixed;
  left: 12px;
  right: 12px;
  z-index: 200;
  padding: 12px;
  position: fixed;
  background: linear-gradient(to right, #666666 0, #555555 100%);
  left: 12px;
  right: 12px;
  opacity: 0.97;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .60);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__msg {
    color: #fff;
    text-align: center;
    padding: 24px 24px 12px;
    font-size: 16px;
  }
  &__btns {
    display: flex;
    justify-content: center;
    padding: 12px;
  }
  &__btn {
    color: #fff;
    display: block;
    margin: 0 12px;
    background: rgba(255, 255, 255, .3);
    padding: 6px 24px;
    border-radius: 30px;
    font-size: 14px;
  }
  &.top {
    top: 12px;
  }
  &.center {
    top: 50%;
    transform: translateY(-50%);
  }
  &.bottom {
    bottom: 12px;
  }
}

.footer {
  font-family: STHeitiSC-Light;
  font-size: 10px;
  background-color: #F9F9F9;
  border-top-width: 0.5px;
  border-top-style: solid;
  border-top-color: #E3E3E3;
  text-align: center;
  padding: 12px;
  p {
    color: #AAA;
    margin-bottom: 4px;
  }
}

.loginWrap {
  height: 100%;
}

.login {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 12px;
  margin-top: -10%;
  &__item {
    margin-bottom: 12px;
    width: 100%;
    max-width: 400px;
  }
  &__inpBox {
    display: flex;
    flex: 1;
  }
  &__title {
    text-align: center;
    color: #555;
    font-size: 18px;
    margin-bottom: 12px;
  }
  &__label {
    display: flex;
    align-items: center;
  }
  &__inp {
    flex: 1;
    height: 35px;
    margin-right: 12px;
    padding: 0 12px;
    font-size: 15px;
    background: #dadada;
    border-radius: 0;
  }
  &__span {
    flex: 0 0 50px;
    widht: 0;
    margin-left: 12px;
    color: #888;
    font-size: 14px;
    background: #dadada;
    height: 35px;
    line-height: 35px;
    padding-left: 12px;
  }
  &__btns {
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }
  &__btn {
    display: block;
    padding: 8px 24px;
    width: 33%;
    margin: 0 12px;
    text-align: center;
    background: #aaa;
    color: #fff;
    font-size: 14px;
    border-radius: 2px;
    background: linear-gradient(to right, #888888 0, #555555 100%);
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: none;
  }
}

.blur {
  filter: blur(5px);
}

.replyPop {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
  border-bottom: 0;
  box-shadow: none;
  .replyMsk {
    content: "";
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, .2);
    z-index: -1;
  }
  .commentMain {
    position: relative;
    z-index: 1;
    background: #F9F9F9;
  }
}

.loading {
  text-align: center;
  padding: 12px;
  &__img {
    display: inline-block;
    width: 30px;
    margin: 0 auto;
  }
  .noData {
    text-align: center;
    font-size: 12px;
    color: #a0a0a0;
    padding: 20px;
  }
}

.loadingImg {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 45px;
  z-index: 100;
}


.hidden {
  display: none;
}

</style>
