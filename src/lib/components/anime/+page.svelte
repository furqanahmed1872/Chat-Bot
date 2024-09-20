<div class="waveContainer">
    <div class="wave wave1"></div>
    <div class="wave wave2"></div>
    <div class="wave wave3"></div>
    <div class="wave wave4"></div>
    <div class="wave wave5"></div> 
    <div class="wave wave2"></div>
    <div class="wave wave4"></div>

</div>

<style>

body {
  background: #222;
}

.waveContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  -webkit-transform: translate3d(0, -50%, 0);
  -moz-transform: translate3d(0, -50%, 0);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 68px;
  --boxSize: 9px;
  --gutter: 4px;
  width: calc((var(--boxSize) + var(--gutter)) * 7);
  align-items: center;
}

.wave {
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  height: 50%;
  width: var(--boxSize);
  background: #fff; /* Make all waves white */
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  border-radius: 80px;
}

.wave1 {
  -webkit-animation-name: random1;
  animation-name: random1;
}

.wave2 {
  -webkit-animation-name: random2;
  animation-name: random2;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.wave3 {
  -webkit-animation-name: random3;
  animation-name: random3;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.wave4 {
  -webkit-animation-name: random4;
  animation-name: random4;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.wave5 {
  -webkit-animation-name: random5;
  animation-name: random5;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes random1 {
  0% {
    height: 25%;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 25%;
  }
}

@keyframes random1 {
  0% {
    height: 25%;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 25%;
  }
}

@-webkit-keyframes random2 {
  0% {
    height: 22%;
  }
  50% {
    height: 65%;
  }
  100% {
    height: 22%;
  }
}

@keyframes random2 {
  0% {
    height: 22%;
  }
  50% {
    height: 65%;
  }
  100% {
    height: 22%;
  }
}

@-webkit-keyframes random3 {
  0% {
    height: 65%;
  }
  50% {
    height: 20%;
  }
  100% {
    height: 65%;
  }
}

@keyframes random3 {
  0% {
    height: 65%;
  }
  50% {
    height: 20%;
  }
  100% {
    height: 65%;
  }
}

@-webkit-keyframes random4 {
  0% {
    height: 20%;
  }
  50% {
    height: 80%;
  }
  100% {
    height: 20%;
  }
}

@keyframes random4 {
  0% {
    height: 20%;
  }
  50% {
    height: 80%;
  }
  100% {
    height: 20%;
  }
}

@-webkit-keyframes random5 {
  0% {
    height: 100%;
  }
  50% {
    height: 35%;
  }
  100% {
    height: 100%;
  }
}

@keyframes random5 {
  0% {
    height: 100%;
  }
  50% {
    height: 35%;
  }
  100% {
    height: 100%;
  }
}



</style>