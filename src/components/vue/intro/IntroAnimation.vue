<template>
  <div class="container">
    <div class="info">Mobile - Try tapping</div>
    <div class="mobile-layout">
      <div class="notification-header">
        <div class="time">9:41</div>
        <div class="necessities">
          <i class="fas fa-signal"></i>
          <i class="fas fa-wifi"></i>
          <i class="fas fa-battery-full"></i>
        </div>
      </div>
      <div class="actions">
        <i class="fas fa-chevron-left"></i>
        <i class="fas fa-bookmark"></i>
      </div>
      <div class="book-cover">
        <img
          class="book-top"
          src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-top.svg"
          alt="book-top"
        />
        <img
          class="book-side"
          src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg"
          alt="book-side"
        />
      </div>
      <div class="preface">
        <div class="content">
          <div class="header">
            <div class="title">The Diary of a Young Girl</div>
            <div class="icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div class="author">by Anne Frank</div>
          <div class="body">
            <p>
              also known as The Diary of Anne Frank, is a book of the writings
              from the Dutch-language diary kept by Anne Frank while she was in
              hiding for two years with her family during the Nazi occupation of
              the Netherlands
            </p>
            <p>
              Anne calls her diary "Kitty", so almost all of the letters are
              written to Kitty.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg);
}

.info {
  font-style: italic;
  font-size: 26px;
  margin-top: 10px;
  color: var(--font-color);
}

.mobile-layout {
  width: var(--mobile-width);
  height: var(--mobile-height);
  margin: 30px 0;
  border-radius: var(--mobile-radius);
  perspective: 500px;
  overflow: hidden;
  color: var(--font-color);
  background-color: var(--mobile-bg);
  box-shadow: 36px 36px 50px 15px #eed7d1d1;

  .notification-header {
    position: fixed;
    top: 5px;
    width: 100%;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    z-index: 6;
  }

  .actions {
    position: fixed;
    top: 37px;
    width: 100%;
    padding: 50px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    z-index: 6;
  }

  .book-cover {
    position: relative;
    height: var(--separator-height);
    width: calc(var(--mobile-width) * 2);
    left: -52.5%;
    border-top-left-radius: var(--mobile-radius);
    border-top-right-radius: var(--mobile-radius);
    background-color: var(--intro-bg);
    transform-style: preserve-3d;
    transform-origin: 50% 40%;
    transition: var(--transition);
    z-index: 4;
  }

  .book-top {
    width: 170px;
    position: absolute;
    top: 180px;
    left: 250px;
    z-index: 5;
    transform: translateZ(28.5px);
  }

  .book-side {
    position: absolute;
    top: 430px;
    left: 222px;
    transform: translateY(-15px) translateX(0px) translateZ(15px)
      rotateX(104deg);
  }

  .book-cover:hover {
    transform: rotateX(75deg) translateZ(3px) scale(0.75);
  }

  .book-cover:hover + .preface {
    transform: translateY(-302px);
    .icon {
      transform: rotateX(180deg);
    }
  }

  .preface {
    height: var(--separator-height);
    padding: 50px;
    transition: var(--transition);
    background: white;

    .header {
      display: flex;
      align-items: center;
    }

    .title {
      font-family: "Quicksand", sans-serif;
      font-size: 26px;
      margin-bottom: 10px;
    }

    .author {
      font-family: "Open Sans", sans-serif;
      font-style: italic;
      margin-bottom: 20px;
    }

    .icon {
      transform-origin: top;
      transition: var(--transition);
    }

    .body {
      font-family: "Quicksand", sans-serif;
    }

    .body p:first-child {
      margin-bottom: 15px;
    }
  }
}
</style>
