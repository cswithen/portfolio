import React from "react";
import { CanvasSpace } from "pts";

export class PtsCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvRef = React.createRef();
    this.space = null;
    this.form = null;
    this._touch = false;
  }

  componentDidMount() {
    this.init();
    this._update();
  }

  componentDidUpdate() {
    this._update();
  }

  componentWillUnmount() {
    this.space.dispose();
  }

  _update() {
    if (this.props.play) {
      this.space.play();
    } else {
      this.space.playOnce(0);
    }

    if (this._touch !== this.props.touch) {
      this._touch = this.props.touch;
      this.space.bindMouse(this._touch).bindTouch(this._touch);
    }
  }

  animate(time, ftime) {
    this.form.point(this.space.pointer, 10);
  }

  start(bound, space) {}

  resize(size, evt) {}

  action(type, px, py, evt) {}

  init() {
    this.space = new CanvasSpace(this.canvRef).setup({
      bgcolor: this.props.background,
      resize: this.props.resize,
      retina: this.props.retina,
    });

    this.form = this.space.getForm();
    this.space.add(this);
  }

  render() {
    return (
      <div className={this.props.name || ""} style={this.props.style}>
        <canvas
          className={this.props.name ? this.props.name + "-canvas" : ""}
          ref={(c) => (this.canvRef = c)}
          style={this.props.canvasStyle}
        ></canvas>
      </div>
    );
  }
}

PtsCanvas.defaultProps = {
  name: "pts",
  background: "#9ab",
  resize: true,
  retina: true,
  play: true,
  touch: true,
  style: {},
  canvasStyle: {},
};
