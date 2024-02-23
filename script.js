// ==UserScript==
// @name         检查前端框架版本
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @include      *
// @icon         
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let versionNodeList = []
    function getVueVersion() {
        let v =
            window.$nuxt?.$root?.constructor?.version ||
            window.Vue?.version ||
            [...document.querySelectorAll('*')]
                .map((el) => el.__vue__?.$root?.constructor?.version || el.__vue_app__?.version)
                .filter(Boolean)[0];

        return v;
    }

    function getReactVersion() {
        let renderers = window?.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers;
        if (renderers && renderers.size > 0) {
            return renderers.get(1).version;
        }
        return "";
    }

    function createPNode(msg) {
        let pNode = document.createElement("p");
        pNode.style = "margin:0";
        pNode.innerText = msg;
        return pNode;
    }
    function Entry() {
        let v = getVueVersion()
        if (v) {
            versionNodeList.push(createPNode(`Vue版本: ${v}`));
        }

        let r = getReactVersion()
        if (r) {
            versionNodeList.push(createPNode(`React版本: ${r}`));
        }

        if (versionNodeList.length > 0) {

            let divId = "VersionListDiv";

            let divNode = document.createElement("div")
            divNode.id = divId;
            divNode.style = `
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
                font-size: 20px;`;

            for (const item of versionNodeList) {
                divNode.appendChild(item)
            }

            let body = document.getElementsByTagName('body')[0];
            body.appendChild(divNode)

            //设置 transform
            let myDiv = document.getElementById(divId);

            setTimeout(function () {
                myDiv.style.transform = 'translateY(0%)';
                setTimeout(function () {
                    myDiv.style.transform = 'translateY(-100%)';
                    setTimeout(function () {
                        // 移除dom
                        myDiv.parentNode.removeChild(myDiv)
                    }, 2000);
                }, 5000);
            }, 1000);

        }
    }

    try {
        Entry();
    } catch (e) {
        console.log('检查前端框架版本,油猴脚本,发生异常:', e);
    }
})();
