// ==UserScript==
// @name         检查vue/react版本
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @include      *
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


function Entry() {
    let vueVer = '';
    let v =
        window.$nuxt?.$root?.constructor?.version ||
        window.Vue?.version ||
        [...document.querySelectorAll('*')]
    .map((el) => el.__vue__?.$root?.constructor?.version || el.__vue_app__?.version)
    .filter(Boolean)[0];
    if (v) {
        vueVer = `<p>Vue版本: ${v}</p>`;
    }

    let reactVer = '';
    let renderers = window?.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers;
    if (renderers && renderers.size > 0) {
        reactVer = `<p>React版本: ${renderers.get(1).version}</p>`;
    }

    if (vueVer !== '' || reactVer !== '') {
        let content = `
            <div
              id="vueReactVersion"
              style="
                  z-index: 99999;
                  width: fit-content;
                  position: fixed;
                  left: 0px;
                  top: 0px;
                  right: 0px;
                  margin: 0px auto;
                  background-color: ghostwhite;
                  color: black;
                  padding: 10px;
                  border-radius: 0px 0px 10px 10px;
                  border: 1px solid;
                  border-top: 0px;
                  transition: transform 0.3s linear 0s;
                  transform: translateY(-100%);
                  font-size: 20px;
              "
              >
                ${vueVer}
                ${reactVer}
              </div>
      `;

        // 追加html
        let body= document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML("afterend",content);
        //设置 transform
        let myDiv = document.getElementById('vueReactVersion');
        setTimeout(function () {
            myDiv.style.transform= 'translateY(0%)';

            setTimeout(function () {
                 myDiv.style.transform='translateY(-100%)';
                setTimeout(function () {
                    // 移除dom
                    myDiv.parentNode.removeChild(myDiv)
                }, 2000);
            }, 5000);
        }, 1000);
    }
}

(function () {
    'use strict';
    try {
        Entry();
    } catch (e) {
        console.log('检查vue/react版本,油猴脚本,发生异常:', e);
    }
})();
