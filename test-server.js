const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

// Load environment variables from .env file if it exists
try {
  const envPath = path.join(__dirname, '.env');
  console.log('Looking for .env file at:', envPath);
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('Found .env file, content:', envContent);
  }
} catch (err) {
  // .env file not found or error reading
}

const typeMap = {
  normal: {
    bgStops: ['#e0e0e0 60%', '#757575 100%'],
    shadowColor: '#75757544',
    textColor: '#222',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M481 256C481 380.264 380.264 481 256 481C131.736 481 31 380.264 31 256C31 131.736 131.736 31 256 31C380.264 31 481 131.736 481 256ZM384.571 256C384.571 327.008 327.008 384.571 256 384.571C184.992 384.571 127.429 327.008 127.429 256C127.429 184.992 184.992 127.429 256 127.429C327.008 127.429 384.571 184.992 384.571 256Z" fill="white"/>'
  },
  fire: {
    bgStops: ['#ff7043 60%', '#b71c1c 100%'],
    shadowColor: '#b71c1c44',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M352.258 395.394C358.584 372.263 346.305 324.71 346.305 324.71C346.305 324.71 337.399 363.449 323.483 377.767C311.611 389.98 297.066 398.451 276.206 400.677C293.261 392.393 304.99 375.12 304.99 355.155C304.99 327.129 281.878 304.409 253.368 304.409C224.858 304.409 201.745 327.129 201.745 355.155C201.745 362.809 203.47 370.068 206.557 376.576C188.725 362.37 185.921 339.594 185.921 339.594C185.921 339.594 166.009 422.264 220.875 461.152C275.74 500.04 383.219 466.614 383.219 466.614C383.219 466.614 229.41 574.837 115.436 457.05C17.2568 355.584 89.8111 222.003 89.8111 222.003C89.8111 222.003 86.6777 234.395 86.6777 248.78C86.6777 263.165 94.477 274.11 94.477 274.11C94.477 274.11 117.742 225.071 135.848 205.128C152.984 186.254 174.465 170.946 193.019 157.724C207.301 147.546 219.849 138.604 227.343 130.223C268.62 84.0687 243.311 0 243.311 0C243.311 0 289.841 41.02 302.831 93.9978C307.783 114.192 304.597 137.169 301.749 157.716C297.125 191.072 293.388 218.025 326.793 216.276C380.775 213.449 333.866 130.223 333.866 130.223C333.866 130.223 456.318 194.583 447.17 307.145C438.021 419.707 313.324 445.297 313.324 445.297C313.324 445.297 345.931 418.525 352.258 395.394Z" fill="white"/>'
  },
  water: {
    bgStops: ['#4fc3f7 60%', '#01579b 100%'],
    shadowColor: '#01579b44',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M422.172 346.515C422.172 437.897 347.813 511.977 256.086 511.977C164.359 511.977 90 437.897 90 346.515C90 257.639 247.102 13.5479 255.718 0.22781C255.915 -0.0759384 256.258 -0.0759358 256.454 0.227813C265.07 13.5479 422.172 257.639 422.172 346.515ZM228.4 458.931C144.12 440.49 158.542 347.13 158.542 347.13C158.542 347.13 181.556 403.488 237.405 421.744C293.253 439.999 360.745 413.225 360.745 413.225C360.745 413.225 312.68 477.371 228.4 458.931Z" fill="white"/>'
  },
  electric: {
    bgStops: ['#fff176 60%', '#fbc02d 100%'],
    shadowColor: '#fbc02d44',
    textColor: '#fff',
    iconSvg: '<path d="M11.29 1L1 13h9v9l10-12h-9z" fill="#000"/>'
  },
  grass: {
    bgStops: ['#81c784 60%', '#388e3c 100%'],
    shadowColor: '#388e3c44',
    textColor: '#fff',
    iconSvg: '<path clip-rule="evenodd" d="m97.4121 440.649c-1.7574-1.653-3.4954-3.338-5.2132-5.056-90.68455-90.684-90.68453-237.713 0-328.397 90.6841-90.6849 379.6401-96.7516 379.6401-96.7516s39.442 334.4646-51.242 425.1486c-80.54 80.54-205.522 89.55-296.005 27.031l72.908-89.471 116.55-25.163-95.139-9.511 60.462-61.562 68.824-15.077-54.422-16.117 54.422-98.176-77.41 86.828-29.893-42.183 10.523 69.648-53.917 60.782-24.993-76.9v102.268z" fill="#fff" fill-rule="evenodd"/>'
  },
  ice: {
    bgStops: ['#b3e5fc 60%', '#0288d1 100%'],
    shadowColor: '#0288d144',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M384.304 39.0418L385.879 177.392L265.209 235.319L263.721 104.69L384.304 39.0418Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M505.269 257.047L385.814 325.374L266.288 256.939L385.752 194.187L505.269 257.047Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M245.04 257.047L125.585 325.374L6.05861 256.939L125.523 194.187L245.04 257.047Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M124.243 38.4753L248.229 99.881L245.059 233.697L127.993 175.719L124.243 38.4753Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M387.678 473.525L263.692 412.119L266.862 278.302L383.928 336.281L387.678 473.525Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M128.525 474.77L126.949 336.42L247.62 278.493L249.108 409.121L128.525 474.77Z" fill="white"/>'
  },
  fighting: {
    bgStops: ['#ff8a65 60%', '#6d4c41 100%'],
    shadowColor: '#6d4c4144',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M88.2336 42.5656C94.4299 18.1014 116.593 0 142.983 0C162.778 0 180.195 10.1847 190.279 25.6H206.792C217.051 15.0716 231.384 8.53333 247.245 8.53333C270.499 8.53333 290.471 22.5882 299.129 42.6667H312.954C321.617 37.2585 331.853 34.1333 342.818 34.1333C366.073 34.1333 386.044 48.1882 394.702 68.2667H432.297C432.618 68.2667 432.919 68.3532 433.178 68.5041C434.895 68.347 436.634 68.2667 438.391 68.2667C469.582 68.2667 494.866 93.5514 494.866 124.742V294.086L494.867 294.4L494.866 294.714V297.153C494.866 298.186 494.838 299.215 494.782 300.239C491.384 417.717 385.749 512 255.933 512C123.974 512 17 414.577 17 294.4C17 236.391 41.9249 183.683 82.5535 144.675C82.4522 201.228 83.4074 259.694 87.8107 258.691C99.6011 256.003 90.3891 80.8395 88.2336 42.5656Z" fill="white"/>'
  },
  poison: {
    bgStops: ['#ba68c8 60%', '#512da8 100%'],
    shadowColor: '#512da844',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M427.821 393.449C479.524 352.108 512 292.376 512 225.95C512 101.161 397.385 0 256 0C114.615 0 0 101.161 0 225.95C0 289.978 30.1737 347.786 78.6553 388.901C75.7171 399.046 74.1052 410.081 74.1052 421.62C74.1052 471.535 104.267 512 141.474 512C165.65 512 186.852 494.915 198.737 469.254C210.622 494.915 231.824 512 256 512C278.038 512 297.604 497.804 309.895 475.857C322.186 497.804 341.752 512 363.789 512C400.996 512 431.158 471.535 431.158 421.62C431.158 411.784 429.986 402.314 427.821 393.449ZM404.211 230.431C404.211 293.785 336.346 345.144 252.632 345.144C168.917 345.144 101.053 293.785 101.053 230.431C101.053 167.077 168.917 115.718 252.632 115.718C336.346 115.718 404.211 167.077 404.211 230.431Z" fill="white"/>'
  },
  ground: {
    bgStops: ['#d7ccc8 60%', '#8d6e63 100%'],
    shadowColor: '#8d6e6344',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M112.764 439.754C112.625 439.754 112.528 439.617 112.574 439.486L243.289 70.134C243.318 70.0537 243.394 70 243.479 70H383.021C383.106 70 383.183 70.0541 383.211 70.1349L511.987 439.487C512.032 439.618 511.935 439.754 511.797 439.754H116.692H112.764ZM0.201306 441.199C0.0609122 441.199 -0.0362852 441.059 0.0129607 440.928L97.3526 181.056C97.3821 180.977 97.4571 180.925 97.541 180.925H182.118C182.258 180.925 182.355 181.064 182.307 181.195L88.1823 441.067C88.1535 441.146 88.0779 441.199 87.9932 441.199H0.201306Z" fill="white"/>'
  },
  flying: {
    bgStops: ['#90caf9 60%', '#1976d2 100%'],
    shadowColor: '#1976d244',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M178.712 477.733C253.715 477.733 317.927 436.048 344.436 376.956C344.76 376.235 238.007 404.699 241.411 394.637C242.931 390.144 308.371 366.238 356.048 338.354C383.451 322.327 396.07 288.4 396.07 288.4C396.07 288.4 349.903 310.815 326.564 316.501C279.532 327.961 238.131 326.727 238.131 325.533C238.131 322.951 306.876 309.889 402.424 251.664C447.367 224.277 459.574 177.103 459.574 177.103C459.574 177.103 410.163 206.535 380.293 216.252C309.457 239.295 244.815 246.239 244.815 243.121C244.815 236.445 301.702 220.802 362.016 191.577C393.376 176.382 420.535 156.53 452.008 134.453C503.506 98.332 511.999 34 511.999 34C511.999 34 461.207 66.7601 436.42 77.6394C334.141 122.531 243.829 146.079 178.712 151.177C80.416 158.873 0 227.456 0 316.501C0 405.547 80.0119 477.733 178.712 477.733Z" fill="white"/>'
  },
  psychic: {
    bgStops: ['#f06292 60%', '#ad1457 100%'],
    shadowColor: '#ad145744',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M455.925 425.184C455.925 425.184 391.365 476.963 262.893 455.536C165.423 439.279 113.437 331.833 113.437 274.079C113.437 137.149 214.783 105.988 283.3 105.988C351.816 105.988 396.513 172.788 396.513 224.508C396.513 276.228 359.933 321.466 303.006 321.466C246.08 321.466 229.22 281.501 229.22 244.758C229.22 208.016 258.947 195.071 286.058 195.071C313.169 195.071 322.452 218.217 322.452 238.11C322.452 258.004 307.017 265.128 294.143 265.128C281.269 265.128 279.996 258.633 275.069 251.807C270.141 244.982 281.353 219.146 262.893 219.146C244.433 219.146 240.992 248.847 240.992 248.847C240.992 248.847 247.722 306.18 303.006 305.191C358.291 304.201 384.518 261.461 376.896 219.146C369.274 176.83 328.207 131.865 256.133 140.951C184.059 150.037 154.632 222.861 167.603 300.685C180.574 378.51 273.807 423.602 347.112 407.379C420.418 391.156 493.429 338.086 493.429 203.533C493.429 68.9789 376.896 -11.9002 237.941 1.42913C98.9859 14.7584 12.729 136.242 18.2502 282.207C23.7714 428.172 162.275 507.669 279.394 511.766C396.513 515.864 468.312 448.067 468.312 448.067C468.312 448.067 484.459 433.668 478.128 422.424C471.798 411.18 455.925 425.184 455.925 425.184Z" fill="white"/>'
  },
  bug: {
    bgStops: ['#aed581 60%', '#689f38 100%'],
    shadowColor: '#689f3844',
    textColor: '#fff',
    iconSvg: '<path clip-rule="evenodd" d="m342.198.501279c.373-.5317158 1.105-.660937 1.637-.288625l36.354 25.455546c.532.3723.661 1.1051.289 1.6368l-50.599 72.2623c24.599 7.8587 41.358 16.3357 41.358 16.3357s-40.964 70.462-110.443 70.462-118.85-65.672-118.85-65.672 17.506-11.172 43.456-20.7539l-55.5-66.1415c-.417-.4973-.352-1.2386.145-1.6558l33.997-28.52715c.498-.41723 1.239-.35238 1.656.14487l70.272 83.74688c6.017-.6806 12.147-1.061 18.333-1.061 8.891 0 17.771.6759 26.44 1.8229zm13.746 189.200721c18.541-13.242 46.597-47.804 46.597-47.804s71.664 56.79 71.664 177.206c0 120.415-123.896 192.888-123.896 192.888s-59.195-59.781-73.727-135.562c-14.531-75.781 21.496-159.927 21.496-159.927s39.324-13.559 57.866-26.801zm-199.683 0c-18.541-13.242-46.597-47.804-46.597-47.804s-71.664 56.79-71.664 177.206c0 120.415 123.896 192.888 123.896 192.888s59.195-59.781 73.727-135.562c14.531-75.781-21.496-159.927-21.496-159.927s-39.324-13.559-57.866-26.801z" fill="#fff" fill-rule="evenodd"/>'
  },
  rock: {
    bgStops: ['#bcaaa4 60%', '#5d4037 100%'],
    shadowColor: '#5d403744',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M395.138 244.757C395.109 244.717 395.097 244.667 395.105 244.618L427.769 54.1518C427.784 54.0641 427.861 54 427.949 54H438.287C438.367 54 438.437 54.0517 438.461 54.1277L512.051 287.131C512.074 287.203 512.049 287.283 511.989 287.33L457.73 329.693C457.649 329.756 457.532 329.74 457.471 329.657L395.138 244.757ZM-1 371.022C-1 371.101 -0.949204 371.171 -0.874109 371.196L110.975 407.767C111.029 407.785 111.089 407.776 111.136 407.744L361.145 235.144C361.187 235.115 361.215 235.07 361.222 235.02L388.032 55.1284C388.049 55.018 387.963 54.9188 387.852 54.9188H166.406C166.351 54.9188 166.3 54.943 166.265 54.9849L-0.957974 256.714C-0.98514 256.747 -1 256.788 -1 256.831V371.022ZM157.583 417.085L279.776 457.112C279.831 457.13 279.892 457.121 279.939 457.087L425.418 352.734C425.499 352.677 425.519 352.566 425.464 352.484L370.928 271.329C370.871 271.244 370.757 271.222 370.673 271.28L157.583 417.085Z" fill="white"/>'
  },
  ghost: {
    bgStops: ['#9575cd 60%', '#311b92 100%'],
    shadowColor: '#311b9244',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M368.952 510.227C322.769 512.591 269.896 512.591 251.928 510.227C111.77 491.788 0 389.313 0 250.8C0 112.287 114.615 0 256 0C397.385 0 512 112.287 512 250.8C512 315.221 487.207 373.969 446.46 418.387C435.395 430.448 450.577 438.908 466.002 447.504C481.13 455.935 496.492 464.496 487.564 476.712C477.726 490.173 424.392 507.389 368.952 510.227ZM220 219.45C220 241.092 202.091 258.637 180 258.637C157.909 258.637 140 241.092 140 219.45C140 204.935 148.055 192.264 160.024 185.491C160.713 204.362 176.229 219.449 195.269 219.449H220C220 219.449 220 219.45 220 219.45ZM343.976 185.491C343.287 204.362 327.771 219.449 308.731 219.449H284C284 219.449 284 219.45 284 219.45C284 241.092 301.909 258.637 324 258.637C346.091 258.637 364 241.092 364 219.45C364 204.935 355.945 192.264 343.976 185.491Z" fill="white"/>'
  },
  dragon: {
    bgStops: ['#7986cb 60%', '#1a237e 100%'],
    shadowColor: '#1a237e44',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M280.702 254.881C284.172 252.765 287.116 248.331 289.49 243.403C320.735 256.173 342.692 286.349 342.692 321.54C342.692 368.29 303.942 406.189 256.142 406.189C236.52 406.189 218.423 399.802 203.906 389.039C199.144 386.784 195.226 384.618 192.02 382.845C187.047 380.096 183.786 378.293 181.744 378.575C175.775 379.398 177.508 384.89 179.083 389.879C180.152 393.268 181.149 396.425 179.606 397.727C177.992 399.091 172.764 394.106 166.655 388.282C158.339 380.353 148.391 370.868 143.7 373.717C139.991 375.97 143.592 382.081 148 389.561L148.327 390.116C150.189 393.278 152.347 396.498 154.316 399.436C158.319 405.407 161.543 410.219 159.93 411.033C157.98 412.017 144.394 402.847 132.945 390.116C128.526 385.203 124.246 379.877 120.268 374.928L120.268 374.927C111.561 364.093 104.307 355.068 100.235 356.137C95.3365 357.423 99.0421 367.527 104.487 377.25C107.033 381.797 110.028 386.427 112.621 390.436L112.621 390.437C116.654 396.671 119.715 401.402 118.605 401.984C117.107 402.767 103.926 389.914 94.9734 373.717C89.6559 364.096 85.1909 353.464 81.5761 344.857C77.656 335.522 74.7359 328.569 72.8131 327.869C66.1325 325.438 66.1325 339.059 68.8119 358.718C69.1614 361.283 69.6819 363.973 70.3228 366.712C96.307 450.785 176.128 512 270.567 512C386.084 512 479.728 420.412 479.728 307.432C479.728 199.9 394.899 111.747 287.12 103.494C287.256 98.4284 289.9 88.383 289.9 88.383C289.9 88.383 308.927 42.3472 309.933 32.5099C309.999 31.857 310.078 31.1475 310.163 30.3919C311.348 19.7629 313.553 0 296.551 0C287.471 0 283.249 6.75464 278.42 14.4799L278.42 14.48C276.566 17.4457 274.622 20.5545 272.28 23.479C255.412 44.5436 227.048 70.8488 210.965 84.8631C176.971 114.484 143.619 138.828 124.167 153.026L124.167 153.026L124.166 153.027C115.319 159.484 109.348 163.843 107.5 165.644C93.574 179.22 43.6418 269.286 43.6418 269.286C43.6418 269.286 27.4943 298.182 33.2338 304.043C38.9733 309.903 52.8141 308.56 52.8141 308.56C52.8141 308.56 238.755 265.903 255.402 262.539C259.884 261.633 263.048 261.11 265.477 260.709C272.072 259.62 273.256 259.424 280.702 254.881ZM149.235 200.064C139.254 209.551 122.701 232.196 122.701 232.196C122.701 232.196 153.465 234.091 170.408 217.986C187.352 201.88 183.47 174.433 183.47 174.433C183.47 174.433 159.215 190.577 149.235 200.064Z" fill="white"/>'
  },
  dark: {
    bgStops: ['#8d8d8d 60%', '#212121 100%'],
    shadowColor: '#21212144',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M229.379 452.85C239.106 454.339 249.068 455.111 259.212 455.111C367.214 455.111 454.767 367.558 454.767 259.556C454.767 151.553 367.214 64 259.212 64C251.966 64 244.811 64.3941 237.77 65.1621C291.345 105.751 326.767 176.062 326.767 256C326.767 340.04 287.616 413.44 229.379 452.85ZM255.656 512C397.041 512 511.656 397.385 511.656 256C511.656 114.615 397.041 0 255.656 0C114.271 0 -0.34375 114.615 -0.34375 256C-0.34375 397.385 114.271 512 255.656 512Z" fill="white"/>'
  },
  steel: {
    bgStops: ['#b0bec5 60%', '#37474f 100%'],
    shadowColor: '#37474f44',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0511107 254.527C-0.0170046 254.411 -0.0170388 254.267 0.0510196 254.15L128.795 34.1843C128.862 34.0702 128.985 34 129.117 34H384.294C384.427 34 384.55 34.0708 384.617 34.1859L511.949 254.152C512.016 254.267 512.016 254.41 511.949 254.525L384.617 474.244C384.55 474.359 384.427 474.43 384.294 474.43H129.117C128.985 474.43 128.862 474.36 128.795 474.246L0.0511107 254.527ZM374.617 254.215C374.617 319.703 321.528 372.792 256.04 372.792C190.552 372.792 137.463 319.703 137.463 254.215C137.463 188.726 190.552 135.638 256.04 135.638C321.528 135.638 374.617 188.726 374.617 254.215Z" fill="white"/>'
  },
  fairy: {
    bgStops: ['#f8bbd0 60%', '#c2185b 100%'],
    shadowColor: '#c2185b44',
    textColor: '#fff',
    iconSvg: '<path fill-rule="evenodd" clip-rule="evenodd" d="M102.726 405.978L184.848 382.166L255.778 511.857C255.871 512.025 256.112 512.025 256.204 511.857L327.134 382.166L409.257 405.978C409.441 406.031 409.612 405.86 409.557 405.676L385.741 325.179L511.856 256.204C512.025 256.112 512.025 255.871 511.857 255.779L384.702 186.235L409.557 102.225C409.612 102.041 409.441 101.87 409.257 101.923L325.208 126.294L256.204 0.126188C256.112 -0.0420597 255.871 -0.0420644 255.779 0.126184L186.775 126.294L102.726 101.923C102.542 101.87 102.371 102.041 102.426 102.225L127.281 186.235L0.126188 255.779C-0.0420597 255.871 -0.0420644 256.112 0.126184 256.204L126.241 325.179L102.426 405.676C102.371 405.86 102.542 406.031 102.726 405.978ZM166.452 256.876L224.631 288.695L256.45 346.873C256.542 347.042 256.784 347.042 256.876 346.873L288.695 288.695L346.873 256.876C347.041 256.784 347.041 256.542 346.873 256.45L288.695 224.631L256.876 166.453C256.784 166.284 256.542 166.284 256.45 166.453L224.631 224.631L166.452 256.45C166.284 256.542 166.284 256.784 166.452 256.876Z" fill="white"/>'
  }
};

app.get('/api/test-card', (req, res) => {
  const typeKey = (req.query.type || 'normal').toLowerCase();
  const typeData = typeMap[typeKey] || typeMap.normal;
  
  // Mock data for testing
  const mockUser = {
    login: 'testuser',
    name: 'Test User',
    // Use a real GitHub avatar image URL (GitHub's official account)
    avatar_url: 'https://avatars.githubusercontent.com/u/9919?v=4',
    followers: 42,
    public_repos: 15,
    created_at: '2020-01-01T00:00:00Z'
  };
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="480" height="600"
  viewBox="0 0 480 600"
>
  <defs>
    <radialGradient id="cardGrad" cx="60%" cy="40%" r="120%">
      <stop offset="60%" stop-color="${typeData.bgStops[0].split(' ')[0]}"/>
      <stop offset="100%" stop-color="${typeData.bgStops[1].split(' ')[0]}"/>
    </radialGradient>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="${typeData.shadowColor}" flood-opacity="0.4"/>
    </filter>
    <filter id="avatarShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#00838f" flood-opacity="0.3"/>
    </filter>
    <clipPath id="avatarClip">
      <circle cx="240" cy="280" r="110"/>
    </clipPath>
  </defs>

  <!-- Card Background -->
  <rect x="0" y="0" width="480" height="600" rx="18"
        fill="url(#cardGrad)" stroke="#b0bec5" stroke-width="4"
        filter="url(#cardShadow)"/>

  <!-- Header Section -->
  <g font-family="Poppins, Segoe UI, Arial, sans-serif" fill="${typeData.textColor}">
    <!-- Experience Level -->
    <text x="32" y="44" font-size="14" font-weight="500" letter-spacing="1" opacity="0.85" text-transform="uppercase">
      JUNIOR DEV
    </text>
    
    <!-- Name -->
    <text x="32" y="80" font-size="36" font-weight="bold" letter-spacing="1">
      ${mockUser.name}
    </text>

    <!-- Followers Badge -->
    <g>
      <g transform="translate(280,24)">
        <rect x="0" y="0" rx="22" width="190" height="48" 
              fill="rgba(255,255,255,0.0)" 
              stroke="#ffd600" stroke-width="3"/>
        <rect x="3" y="3" rx="19" width="184" height="42" fill="none" stroke="#fffde7" stroke-width="2"/>
        <text x="95" y="32" font-size="20" font-weight="bold" fill="#ffd600" letter-spacing="1" text-anchor="middle" alignment-baseline="middle">
          Followers: ${user.followers}
        </text>
      </g>
      <g transform="translate(420,80)">
        <circle cx="22" cy="22" r="22" fill="url(#cardGrad)" filter="url(#cardShadow)"/>
        <g transform="translate(8,8) scale(1.1)">${typeData.iconSvg}</g>
      </g>
    </g>

    <!-- Type Icon -->
    <g transform="translate(420,32)">
      <circle cx="22" cy="22" r="22" fill="url(#cardGrad)" filter="url(#cardShadow)"/>
      <g transform="translate(8,8)">${typeData.iconSvg}</g>
    </g>
  </g>

  <!-- Divider Line -->
  <line x1="32" y1="112" x2="448" y2="112"
        stroke="${typeData.textColor}" stroke-opacity="0.6" stroke-width="1"/>

  <!-- Avatar Section -->
  <g transform="translate(240,280)">
    <circle cx="0" cy="0" r="116" fill="#fff" filter="url(#avatarShadow)"/>
    <circle cx="0" cy="0" r="110" fill="#fff" stroke="#b0bec5" stroke-width="3"/>
    <image xlink:href="${mockUser.avatar_url}"
           x="-110" y="-110" width="220" height="220"
           clip-path="url(#avatarClip)"/>
  </g>

  <!-- Content Section -->
  <g font-family="Poppins, Segoe UI, Arial, sans-serif" fill="${typeData.textColor}">
    <!-- Skills -->
    <text x="32" y="420" font-size="18">
      <tspan font-weight="bold">Skills:</tspan> JavaScript, Python, CSS
    </text>
    
    <!-- Special Abilities Header -->
    <text x="32" y="460" font-size="18" font-weight="bold">
      Special Abilities:
    </text>
    
    <!-- Stars Ability -->
    <text x="56" y="490" font-size="18">Stars ⭐</text>
    <text x="420" y="490" font-size="24" font-weight="bold" text-anchor="end">25</text>
    
    <!-- Public Repos Ability -->
    <text x="56" y="520" font-size="18">Public Repos 📦</text>
    <text x="420" y="520" font-size="24" font-weight="bold" text-anchor="end">${mockUser.public_repos}</text>
    
    <!-- Recent Activity -->
    <text x="32" y="560" font-size="18">
      <tspan font-weight="bold">Recent Activity:</tspan> PushEvent in testuser/repo (1/1/2024)
    </text>
  </g>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.get('/api/avatar-proxy', async (req, res) => {
  const url = req.query.url;
  if (!url || !/^https:\/\//.test(url)) {
    return res.status(400).send('Invalid URL');
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(404).send('Image not found');
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    const buffer = await response.buffer();
    res.send(buffer);
  } catch (err) {
    res.status(500).send('Error fetching image');
  }
});

app.get('/api/card', async (req, res) => {
  // To avoid GitHub API rate limits and 'User not found' errors, provide a personal access token:
  // 1. Set GITHUB_TOKEN=your_token_here in a .env file in your project root, OR
  // 2. Pass ?token=your_token_here in the API request URL (e.g. /api/card?username=octocat&token=your_token_here)
  const username = req.query.username || 'octocat';
  const typeKey = (req.query.type || 'normal').toLowerCase();
  const typeData = typeMap[typeKey] || typeMap.normal;

  // Use predefined icon from typeMap
  const typeIconSvg = typeData.iconSvg || '<circle cx="12" cy="12" r="10" fill="#ffd600"/>';
  const headers = {
    'User-Agent': 'animated-profile-stats'
  };

  try {
    // 1) Fetch user
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userRes.ok) {
      const errorText = await userRes.text();
      console.log(`GitHub API error for user ${username}: ${userRes.status} - ${errorText}`);
      if (userRes.status === 404) {
        throw new Error(`User '${username}' not found on GitHub`);
      } else if (userRes.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Try again later.');
      } else {
        throw new Error(`GitHub API error: ${userRes.status} - ${errorText}`);
      }
    }
    const user = await userRes.json();

    // 2) Compute exp level
    const createdAt = new Date(user.created_at);
    const years = Math.floor((Date.now() - createdAt) / (1000*60*60*24*365));
    const repos = user.public_repos;
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events`,
      { headers }
    );
    const events = await eventsRes.json();

    // 3) Count stars
    const allRepos = await fetchAllRepos(username, headers);
    const stars = allRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    // 4) Determine level
    const expScore = stars*2 + repos*3 + years*10;
    let level = 'Junior Dev';
    if (expScore > 300)  level = 'Mid Dev';
    if (expScore > 800)  level = 'Senior Dev';
    if (expScore > 2000) level = 'Lead Dev';

    // 5) Recent activity
    const latest = Array.isArray(events) && events[0];
    const activity = latest
      ? `${latest.type.replace('Event','')} in ${latest.repo.name} (${new Date(latest.created_at).toLocaleDateString()})`
      : 'No recent public activity';

    // 6) Gradient stops
    const [s0, s1] = typeData.bgStops;


    // 7) Render SVG at fixed 480x600, styled to match the second reference image
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="480" height="600"
  viewBox="0 0 480 600"
>
  <defs>
    <radialGradient id="cardGrad" cx="60%" cy="40%" r="120%">
      <stop offset="0%" stop-color="#fff"/>
      <stop offset="15%" stop-color="${typeData.bgStops[0].split(' ')[0]}"/>
      <stop offset="40%" stop-color="${typeData.bgStops[0].split(' ')[0]}"/>
      <stop offset="60%" stop-color="${typeData.bgStops[1].split(' ')[0]}"/>
      <stop offset="85%" stop-color="#333"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient>
    <radialGradient id="iconGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${typeData.bgStops[0].split(' ')[0]}"/>
      <stop offset="100%" stop-color="${typeData.bgStops[1].split(' ')[0]}"/>
    </radialGradient>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="${typeData.shadowColor}" flood-opacity="0.4"/>
    </filter>
    <filter id="avatarShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#00838f" flood-opacity="0.3"/>
    </filter>
    <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ffe066" flood-opacity="0.7"/>
    </filter>
    <filter id="badgeGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#ffd600" flood-opacity="0.6"/>
    </filter>
    <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ffe066" flood-opacity="0.5"/>
    </filter>
    <clipPath id="avatarClip">
      <circle cx="240" cy="280" r="110"/>
    </clipPath>
  </defs>

  <!-- Card Background -->
  <rect x="0" y="0" width="480" height="600" rx="18"
        fill="url(#cardGrad)" stroke="#ffe066" stroke-width="4"
        filter="url(#cardShadow)"/>

  <!-- Header Section -->
  <g font-family="Poppins, Segoe UI, Arial, sans-serif">
    <!-- Experience Level -->
    <text x="32" y="44" font-size="14" font-weight="500" letter-spacing="1" opacity="0.85" fill="#fff" style="text-transform:uppercase;">
      ${level.toUpperCase()}
    </text>

      <!-- Followers Badge -->
    <g transform="translate(230,14)">
      <rect x="0" y="0" rx="22" width="190" height="48" 
            fill="#ffd600" 
            stroke="#ffd600" stroke-width="3"/>
      <rect x="3" y="3" rx="19" width="184" height="42" fill="none" stroke="#fffde7" stroke-width="2"/>
      <text x="95" y="28" font-size="18" font-weight="bold" fill="#fff" letter-spacing="1" text-anchor="middle">
          Followers: ${user.followers}
        </text>
      </g>
    <!-- Type Icon -->
    <g transform="translate(430,14)">
      <circle cx="22" cy="22" r="22" fill="url(#iconGrad)" stroke="#fff" stroke-width="3" filter="url(#cardShadow)"/>
      <g transform="translate(9,9) scale(0.05)">${typeIconSvg}</g>
    </g>

    <!-- Name -->
    <text x="32" y="100" font-size="40" font-weight="bold" letter-spacing="1" fill="#fff">
      ${user.name || user.login}
    </text>
  </g>

  <!-- Divider Line -->
  <line x1="32" y1="112" x2="448" y2="112"
        stroke="#fff" stroke-opacity="0.5" stroke-width="1"/>

  <!-- Avatar Section -->
  <g transform="translate(240,280)">
    <circle cx="0" cy="0" r="116" fill="#fff" filter="url(#avatarShadow)"/>
    <circle cx="0" cy="0" r="110" fill="#fff" stroke="#b0bec5" stroke-width="3"/>
    <image xlink:href="${user.avatar_url}"
           x="-110" y="-110" width="220" height="220"
           style="clip-path:circle(110px at 110px 110px)"/>
  </g>

  <!-- Content Section -->
  <g font-family="Poppins, Segoe UI, Arial, sans-serif" fill="#fff">
    <!-- Skills -->
    <text x="32" y="420" font-size="18">
      <tspan font-weight="bold">Skills:</tspan> ${await getTopLangs(username, headers)}
    </text>
    <!-- Special Abilities Header -->
    <text x="32" y="460" font-size="18" font-weight="bold">
      Special Abilities:
    </text>
    <!-- Stars Ability -->
    <text x="56" y="490" font-size="18">Stars ⭐</text>
    <text x="420" y="490" font-size="24" font-weight="bold" text-anchor="end">${stars}</text>
    <!-- Public Repos Ability -->
    <text x="56" y="520" font-size="18">Public Repos 📦</text>
    <text x="420" y="520" font-size="24" font-weight="bold" text-anchor="end">${repos}</text>
    <!-- Recent Activity -->
    <text x="32" y="560" font-size="18">
      <tspan font-weight="bold">Recent Activity:</tspan> ${activity}
    </text>
  </g>
</svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  }
  catch (err) {
    console.log(`Error generating card for ${username}:`, err.message);
    const errorMessage = err.message.includes('rate limit') 
      ? 'Rate limit exceeded. Try again later.'
      : err.message;
    
    res.status(404).send(`
<svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="500" height="200" fill="#f5f5f5" rx="10"/>
  <text x="250" y="80" font-size="20" fill="#d32f2f" text-anchor="middle" font-family="Arial, sans-serif">
    ${errorMessage}
  </text>
  <text x="250" y="120" font-size="14" fill="#666" text-anchor="middle" font-family="Arial, sans-serif">
    This API is subject to GitHub public rate limits.
  </text>
  <text x="250" y="140" font-size="12" fill="#666" text-anchor="middle" font-family="Arial, sans-serif">
    Remove this message before pushing to production.
  </text>
</svg>`);
  }
});

// Helper: fetch all repos for star count
async function fetchAllRepos(username, headers) {
  let page = 1, all = [];
  while (true) {
    try {
      const r = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
        { headers }
      );
      if (!r.ok) {
        console.log(`Repo fetch error: ${r.status} - ${await r.text()}`);
        break;
      }
      const js = await r.json();
      if (!Array.isArray(js) || js.length === 0) break;
      all.push(...js);
      page++;
    } catch (err) {
      console.log(`Error fetching repos page ${page}:`, err.message);
      break;
    }
  }
  return all;
}

// Helper: get top languages from repos
async function getTopLangs(username, headers) {
  try {
    const repos = await fetchAllRepos(username, headers);
    const langCount = {};
    repos.forEach(r => {
      if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    });
    const topLangs = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang]) => lang);
    return topLangs.join(', ') || 'No languages detected';
  } catch (err) {
    return 'JavaScript, CSS, HTML';
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/test`);
});