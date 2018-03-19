import React from 'react';
import FileUpload from './FileUpload.jsx';

import './index.scss';
class FileUploader extends React.Component {
    onImageDelete(e) {
        let index = parseInt(e.target.getAttribute('index'));
        this.props.onDelete(index);
    }
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
            },
            imgPreview = this.props.images.length > 0 ? this.props.images.map((image, index) => {
                return (
                    <div key={index} className="img-con" >
                        <img src={image.url}/>
                        <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                    </div>
                )
            }) : null
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <div>
                {imgPreview}
                <FileUpload options={options}>
                    <span className="btn-icon" ref="chooseAndUpload">
                        <i className="fa fa-plus"></i>
                    </span>
                </FileUpload>
            </div>
        )
    }
}
export default FileUploader;