import React from 'react';
import FileUpload from './FileUpload.jsx';

import './index.scss';
class FileUploader extends React.Component {
    render() {
        /*set properties*/
        const options = {
            baseUrl: '/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: (res) => {
                this.props.onSuccess(res.data)
            },
            uploadError: (err) => {
                this.props.onError(err.msg || '上传图片失败');
            }
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <span className="btn-icon" ref="chooseAndUpload">
                    <i className="fa fa-plus"></i>
                </span>
            </FileUpload>
        )
    }
}
export default FileUploader;