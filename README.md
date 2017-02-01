update_name-node.js / edit by 5hir4tor1
=======================================

Node.jsでUpdate_Name

## Requirement

- twitter
- confu

## Install
①
```sh
$ git clone https://github.com/5hir4tor1/update_name-node.js.git
```

②次のどちらか

(1) app.js の ```screen_name``` と4つの API Key を直接記述  
(2)
```sh
$ mkdir config
$ cd config
$ touch key.json
```
```json
{
    "test": {
        "cons_key":      "xxx",
        "cons_sec":      "xxx",
        "acc_token":     "xxx",
        "acc_token_sec": "xxx"
    }
}
```

③
```sh
npm install
node app.js
```

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)