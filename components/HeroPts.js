import { Line, Create, Pt } from "pts";
import { PtsCanvas } from "../lib/TemplateCanvas";

export class HeroPts extends PtsCanvas {
  constructor() {
    super();
    this.pts = [];
    this.colors = ["#D9593D", "#F2AF5C", "#6FA8BF", "#30588C"];
  }

  start(bound) {
    // creating a random distribution of up to 200 points on the canvas
    let count = window.innerWidth * 0.03;
    if (count > 50) count = 50;
    this.pts = Create.distributeRandom(this.space.innerBound, count);
  }

  animate(time, ftime, space) {
    // setting up rotation of every object
    this.pts.rotate2D(-0.001, this.space.center);

    this.pts.forEach((p, i) => {
      // create a new point
      let lp = new Pt(p);

      // move that point a set distance away at an angle
      lp.toAngle(-Math.PI / 1.5, 5000);

      // create a path between the two points (note this is only for the highlighting not the stroke)
      let path = [p, lp];

      // find the closest point on the path to our cursor
      let closestPoint = Line.perpendicularFromPt(path, space.pointer);

      // get the distance between the pointer and the closest point
      let distance = Line.magnitudeSq([space.pointer, closestPoint]);

      // set base brightness
      let brightness = 0.09;

      if (distance < 300) {
        brightness += 0.035;
      } else if (distance > 300) {
        brightness -= 0.01;
      }

      // this draws the stroke line
      this.form.stroke(`rgba(255,255,255,${brightness})`, 2).line([p, lp]);

      // this fills the circles
      this.form
        .fillOnly(this.colors[i % this.colors.length])
        .point(p, 1.5, "circle");
    });
  }

  // recalc on resize
  resize(size, evt) {
    this.start();
  }
}

export default HeroPts;
