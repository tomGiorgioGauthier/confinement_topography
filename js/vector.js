export class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    isNull() {
        return (this.x === 0 || this.x === undefined) && (this.y === 0 || this.y === undefined) && (this.z === 0 || this.z === undefined);
    }

    getDistance2D(otherVector) {
        let xdistance = Math.pow((otherVector.x - this.x), 2);
        let ydistance = Math.pow((otherVector.y - this.y), 2);
        return Math.sqrt(xdistance + ydistance);
    }

    getDistance3D(otherVector) {
        let xdistance = Math.pow((otherVector.x - this.x), 2);
        let ydistance = Math.pow((otherVector.y - this.y), 2);
        let zdistance = Math.pow((otherVector.z - this.z), 2);
        return Math.sqrt(xdistance + ydistance + zdistance);
    }
}