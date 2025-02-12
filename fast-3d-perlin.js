let p = mp(256);

function xos(x) {
  x *= 7;
  x &= 0xff;
  x = x ^ (x << 13);
  x = x ^ (x >> 17);
  x = x ^ (x << 5);
  return x;
}

function mp(size) {
  let p = new Uint8Array(size * 2);
  for (let i = 0; i < p.length; ++i) {
    p[i] = xos(i);
  }
  return p;
}

function fractalPerlinNoise3d(
  x,
  y = 0,
  z = 0,
  octaveCount = 4,
  persistence = 0.5,
  scaleFactor = 2,
  offset = 0.618
) {
  let noiseSum = perlinNoise3d(x, y, z);
  let maxValue = 1;
  let iSF = 1 / scaleFactor;
  let currentScaleFactor = scaleFactor;
  let currentPersistence = persistence;
  while (octaveCount > 1) {
    noiseSum +=
      perlinNoise3d(
        x * currentScaleFactor + offset,
        y * currentScaleFactor + offset,
        z * currentScaleFactor + offset
      ) * currentPersistence;
    maxValue += currentPersistence;
    currentScaleFactor *= scaleFactor;
    currentPersistence *= persistence;
    offset *= iSF;
    octaveCount -= 1;
  }

  return noiseSum / maxValue;
}

function perlinNoise3d(x, y = 0, z = 0) {
  let xw = Math.floor(x);
  let x0 = x - xw;
  let x1 = x0 - 1;
  xw &= 255;

  let yw = Math.floor(y);
  let y0 = y - yw;
  let y1 = y0 - 1;
  yw &= 255;

  let zw = Math.floor(z);
  let z0 = z - zw;
  let z1 = z0 - 1;
  zw &= 255;

  let r0 = p[xw] + yw;
  let r1 = p[xw + 1] + yw;

  let r00 = p[r0] + zw;
  let r10 = p[r1] + zw;
  let r01 = p[r0 + 1] + zw;
  let r11 = p[r1 + 1] + zw;

  let a = p[r00];
  let b = p[r10];
  let c = p[r01];
  let d = p[r11];
  let e = p[r00 + 1];
  let f = p[r10 + 1];
  let g = p[r01 + 1];
  let h = p[r11 + 1];

  // prettier-ignore
  {
  switch   (a & 7) {
    case 0: a =  x0 + y0 + z0; break;
    case 1: a = -x0 + y0 + z0; break;
    case 2: a =  x0 - y0 + z0; break;
    case 3: a = -x0 - y0 + z0; break;
    case 4: a =  x0 + y0 - z0; break;
    case 5: a = -x0 + y0 - z0; break;
    case 6: a =  x0 - y0 - z0; break;
    case 7: a = -x0 - y0 - z0; break;
    default:a = 0; break;
  }
  switch   (b & 7) {
    case 0: b =  x1 + y0 + z0; break;
    case 1: b = -x1 + y0 + z0; break;
    case 2: b =  x1 - y0 + z0; break;
    case 3: b = -x1 - y0 + z0; break;
    case 4: b =  x1 + y0 - z0; break;
    case 5: b = -x1 + y0 - z0; break;
    case 6: b =  x1 - y0 - z0; break;
    case 7: b = -x1 - y0 - z0; break;
    default:b = 0; break;
  }
  switch   (c & 7) {
    case 0: c =  x0 + y1 + z0; break;
    case 1: c = -x0 + y1 + z0; break;
    case 2: c =  x0 - y1 + z0; break;
    case 3: c = -x0 - y1 + z0; break;
    case 4: c =  x0 + y1 - z0; break;
    case 5: c = -x0 + y1 - z0; break;
    case 6: c =  x0 - y1 - z0; break;
    case 7: c = -x0 - y1 - z0; break;
    default:c = 0; break;
  }
  switch   (d & 7) {
    case 0: d =  x1 + y1 + z0; break;
    case 1: d = -x1 + y1 + z0; break;
    case 2: d =  x1 - y1 + z0; break;
    case 3: d = -x1 - y1 + z0; break;
    case 4: d =  x1 + y1 - z0; break;
    case 5: d = -x1 + y1 - z0; break;
    case 6: d =  x1 - y1 - z0; break;
    case 7: d = -x1 - y1 - z0; break;
    default:d = 0; break;
  }
  switch   (e & 7) {
    case 0: e =  x0 + y0 + z1; break;
    case 1: e = -x0 + y0 + z1; break;
    case 2: e =  x0 - y0 + z1; break;
    case 3: e = -x0 - y0 + z1; break;
    case 4: e =  x0 + y0 - z1; break;
    case 5: e = -x0 + y0 - z1; break;
    case 6: e =  x0 - y0 - z1; break;
    case 7: e = -x0 - y0 - z1; break;
    default:e = 0; break;
  }
  switch   (f & 7) {
    case 0: f =  x1 + y0 + z1; break;
    case 1: f = -x1 + y0 + z1; break;
    case 2: f =  x1 - y0 + z1; break;
    case 3: f = -x1 - y0 + z1; break;
    case 4: f =  x1 + y0 - z1; break;
    case 5: f = -x1 + y0 - z1; break;
    case 6: f =  x1 - y0 - z1; break;
    case 7: f = -x1 - y0 - z1; break;
    default:f = 0; break;
  }
  switch   (g & 7) {
    case 0: g =  x0 + y1 + z1; break;
    case 1: g = -x0 + y1 + z1; break;
    case 2: g =  x0 - y1 + z1; break;
    case 3: g = -x0 - y1 + z1; break;
    case 4: g =  x0 + y1 - z1; break;
    case 5: g = -x0 + y1 - z1; break;
    case 6: g =  x0 - y1 - z1; break;
    case 7: g = -x0 - y1 - z1; break;
    default:g = 0; break;
  }
  switch   (h & 7) {
    case 0: h =  x1 + y1 + z1; break;
    case 1: h = -x1 + y1 + z1; break;
    case 2: h =  x1 - y1 + z1; break;
    case 3: h = -x1 - y1 + z1; break;
    case 4: h =  x1 + y1 - z1; break;
    case 5: h = -x1 + y1 - z1; break;
    case 6: h =  x1 - y1 - z1; break;
    case 7: h = -x1 - y1 - z1; break;
    default:h = 0; break;
  }
  }

  let u = fadeQuintic(x0);
  let v = fadeQuintic(y0);
  let w = fadeQuintic(z0);

  let uv = u * v;
  let uw = u * w;
  let vw = v * w;
  let uvw = uv * w;

  // https://iquilezles.org/articles/morenoise/
  let k0 = -a + b;
  let k1 = -a + c;
  let k2 = -a + e;
  let k3 = -k0 - c + d;
  let k4 = -k0 - e + f;
  let k5 = -k1 - e + g;
  let k6 = -k3 + e - f - g + h;

  let result =
    a + u * k0 + v * k1 + w * k2 + uv * k3 + uw * k4 + vw * k5 + uvw * k6;

  return result;

  let du = dFadeQuintic(x0) * (k0 + v * k3 + w * k4 + vw * k6);
  let dv = dFadeQuintic(y0) * (k1 + u * k3 + w * k5 + uw * k6);
  let dw = dFadeQuintic(z0) * (k2 + u * k4 + v * k5 + uv * k6);

  return [result, du, dv, dw];
}

function fadeCubic(t) {
  return t * t * (-2 * t + 3);
}
function dFadeCubic(t) {
  return t * (6 - 6 * t);
}

function fadeQuintic(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function dFadeQuintic(t) {
  return t * t * (t * (30 * t - 60) + 30);
}
