import React, { Component} from 'react'
import ReactDOM from "react-dom"

import { Link } from "react-router-dom"
import "./style.scss"

import { render } from "react-dom";
import AceEditor from "react-ace";

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

    }


    render() {
        return (
            <div className="home">

                <div className="row">
                    <div className="col-lg-12 col-xl-6">
                        <div class="editor">

                            <AceEditor
                                placeholder="Placeholder Text"
                                mode="javascript"
                                theme="monokai"
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


                <div class="eval_class" style={{display:"none"}}></div>

            </div>
        )
    }
}
