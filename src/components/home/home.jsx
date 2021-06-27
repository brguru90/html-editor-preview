import React, { Component } from 'react'
import "./style.scss"
import AceEditor from "react-ace";
import { Button, Switch } from 'antd';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";

export default class home extends Component {


    state = {
        initial_web_code:
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>           
               
            </head>
            <body>       
                <h2>Welcome</h2>       
                
                <script defer>
                    document.body.innerHTML=document.body.innerHTML+"<h1>Welcome web editor(by JS)</h1>";
                </script>
            </body>
            </html>
        `,
        dark_mode:true
    }


    componentDidMount() {
        let iframe = document.querySelector(".render_web_code")
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(this.state.initial_web_code);
        iframe.contentWindow.document.close();
    }



    onLoad = (e) => {
    }

    onChange = (new_val) => {
        console.log("new_val")
        let iframe = null
        try {
            iframe = document.querySelector(".render_web_code")
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(new_val);
        } catch (error) {
            console.log(error)
        }
        finally {
            if (iframe?.contentWindow?.document) {
                iframe.contentWindow.document.close();
            }
        }

        this.setState({ initial_web_code: new_val })

    }

    saveDownloadedData = (fileName, data) => {
        if (~navigator.userAgent.indexOf("MSIE") || ~navigator.appVersion.indexOf("Trident/")) {
            /* IE9-11 */
            const blob = new Blob([data], { type: "text/csv;charset=utf-8;" })
            navigator.msSaveBlob(blob, fileName)
        } else {
            const link = document.createElement("a")

            link.setAttribute("target", "_blank")
            if (Blob !== undefined) {
                const blob = new Blob([data], { type: "text/plain" })
                link.setAttribute("href", URL.createObjectURL(blob))
            } else {
                link.setAttribute("href", "data:text/plain," + encodeURIComponent(data))
            }

            ~window.navigator.userAgent.indexOf("Edge") && (fileName = fileName.replace(/[&\/\\#,+$~%.'':*?<>{}]/g, "_")) /* Edge */

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }


    render() {
        return (
            <div className="home">

                <div className="cus_switch">
                    <Switch className="dark_mode" checkedChildren="Dark mode" unCheckedChildren="Light mode" defaultChecked={this.state.dark_mode} onChange={(e) => this.setState({ dark_mode: e })} />
                </div>

                <div className="row">
                    <div className="col-lg-12 col-xl-6">
                        <div class="editor">

                            <AceEditor
                                placeholder="Placeholder Text"
                                mode="javascript"
                                theme={this.state.dark_mode?"monokai":"github"}
                                name="web_editor"
                                onLoad={this.onLoad}
                                onChange={this.onChange}
                                fontSize={14}
                                showPrintMargin={false}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={this.state.initial_web_code}
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 2
                                }}
                                width="100%"

                            />
                        </div>
                    </div>

                    <div className="col-lg-12 col-xl-6">
                        <iframe className="render_web_code">

                        </iframe>
                    </div>


                </div>

                <Button type="primary" className="doc_save_btn" onClick={e => this.saveDownloadedData("download.txt", this.state.initial_web_code)}>Download code</Button>

            </div>
        )
    }
}
