import React, { Component } from "react";
import FileUpload from "react-firebase-file-uploader";
import { CircularProgress } from "@material-ui/core";
import { storage } from "../../firebase";

class FileUploader extends Component {
  state = {
    name: "",
    isUploading: false,
    fileURL: "",
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileURL: props.defaultImg,
      });
    }
    return null;
  }

  handleStart = () => {
    this.setState({ isUploading: true });
  };
  handleError = () => {
    this.setState({ isUploading: false });
  };
  handleSuccess = (filename) => {
    storage
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        console.log(filename, url);
        this.setState({ isUploading: false, name: filename, fileURL: url });
        this.props.filename(filename);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isUploading: false });
      });
  };

  resetImage = () => {
    this.setState({ name: "", isUploading: false, fileURL: "" });
    this.props.resetImage();
  };

  render() {
    const { name, fileURL, isUploading } = this.state;
    return (
      <div>
        {!fileURL ? (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <FileUpload
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={storage.ref(this.props.dir)}
              onUploadStart={this.handleStart}
              onUploadError={this.handleError}
              onUploadSuccess={(filename) => this.handleSuccess(filename)}
            />
          </div>
        ) : (
          <div className="image_upload_container">
            <img src={fileURL} alt={name} style={{ width: "100%" }} />
            <div className="remove" onClick={this.resetImage}>
              Remove
            </div>
          </div>
        )}
        {isUploading ? (
          <div
            className="progress"
            style={{ textAlign: "center", margin: "30px 0" }}
          >
            <CircularProgress thickness={7} style={{ color: "#98C6E9" }} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default FileUploader;
