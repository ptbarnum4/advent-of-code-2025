import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Coord = [number, number];
type Dims = {
  top: number;
  left: number;
  width: number;
  height: number;
};
const getParsedData = async (file = 'data.txt'): Promise<Coord[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/).map((v) => v.split(',').map((n) => parseInt(n)) as Coord);
};

const getDims = (coords: Coord[]) => {
  const dims = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  coords.forEach(([x, y]) => {
    if (x > dims.width) {
      dims.width = x;
    }
    if (dims.left === 0 || x < dims.left) {
      dims.left = x;
    }
    if (dims.top === 0 || y < dims.top) {
      dims.top = y;
    }
    if (y > dims.height) {
      dims.height = y;
    }
  });
  return dims;
};

class Grid {
  private _coords: Coord[] = [];
  private _dims: Dims;

  constructor(dims: Dims, coords: Coord[]) {
    this._dims = dims;
    this._coords = coords;
  }

  largestArea() {
    let largest = 0;

    const coords = this._coords;
    for (let i = 0; i < coords.length - 1; i++) {
      const [x1, y1] = coords[i] as Coord;
      for (let j = i + 1; j < coords.length; j++) {
        const [x2, y2] = coords[j] as Coord;
        const x3 = Math.abs(x1 - x2) + 1;
        const y3 = Math.abs(y1 - y2) + 1;
        const area = x3 * y3;
        if (area > largest) {
          largest = area;
        }
      }
    }
    return largest;
  }
}

export const day09PartOne = async () => {
  const lines = await getParsedData();
  // const lines = await getParsedData('example.txt');

  const dims = getDims(lines);
  const grid = new Grid(dims, lines);
  return grid.largestArea();
};

export const day09PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

const day09 = async () => {
  await day09PartOne();
  // await day09PartTwo();
};

export default day09;
