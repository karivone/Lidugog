<template>
  <div>
    <section class="about-section">
      <img src="../assets/Picture.jpeg" alt="Kayewi" class="about-img-rect" />
      <div class="about-desc">
        <h1>Hi, I'm Kayewi</h1>
        <p>
          I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
        </p>
        <p>
          This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.
        </p>
        <p>
          At Wix we’re passionate about making templates that allow you to build fabulous websites and it’s all thanks to the support and feedback from users like you! Keep up to date with New Releases and what’s Coming Soon in Wix ellaneous in Support. Feel free to tell us what you think and give us feedback in the Wix Forum. If you’d like to benefit from a professional designer’s touch, head to the Wix Arena and connect with one of our Wix Pro designers. Or if you need more help you can simply type your questions into the Support Forum and get instant answers. To keep up to date with everything Wix, including tips and things we think are cool, just head to the Wix Blog!
        </p>
      </div>
    </section>
    <h1 class="resources-title">Resources</h1>
    <section class="resources-section">
      <div class="resources-container">
        <div class="resources-left">
          <h2>Free Mental Health Resources & Information</h2>
          <h3>When Asking a Friend Is Just Not Enough</h3>
          <p>I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. </p>
        </div>
        <div class="resources-right">
          <div class="resources-group">
            <h3>Websites</h3>
            <ul>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. ​Click here to edit me.</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. ​Click here to edit me.</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. ​Click here to edit me.</a></li>
            </ul>
          </div>
          <div class="resources-group">
            <h3>Organizations</h3>
            <ul>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. ​Click here to edit me.</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. ​Click here to edit me.</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. Click here to edit me.</a></li>
            </ul>
          </div>
          <div class="resources-group">
            <h3>Books</h3>
            <ul>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. ​Click here to edit me.</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. ​Click here to edit me.</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener">I’m an item. Click here to edit me.</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<style scoped>
.about-section {
  display: flex;
  align-items: left;
  justify-content: left;
  gap: 1rem;
  width: 80vw;
  margin: 0;
  padding: 1rem 0vw;
  background: #fff;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  box-sizing: border-box;
}
.about-img-rect {
  width: 280px;
  height: 480px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.about-desc {
  flex: 1;
}
.about-desc h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #222;
}
.about-desc p {
  font-size: 1.2rem;
  color: #444;
}
@media (max-width: 900px) {
  .about-section {
    flex-direction: column;
    padding: 2rem 1rem;
  }
  .about-img {
    width: 160px;
    height: 160px;
  }
}
</style>
<style scoped>
.resources-section {
  width: 80vw;
  margin: 2.5rem 0 0 0;
  background: #fff;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  box-sizing: border-box;
  padding: 2.5rem 2vw;
}
.resources-container {
  display: flex;
  flex-direction: row;
  gap: 20vw;
  justify-content: space-between;
}
.resources-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.resources-left h2 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #222;
}
.resources-left h3 {
  font-size: 1.1rem;
  color: #42b983;
  margin-bottom: 0.5rem;
}
.resources-left p {
  font-size: 1rem;
  color: #444;
}
.resources-right {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.resources-group {
  flex: 1;
}
.resources-group h3 {
  font-size: 1.1rem;
  color: #222;
  margin-bottom: 0.5rem;
}
.resources-group ul {
  list-style: disc inside;
  padding-left: 1rem;
}
.resources-group li {
  font-size: 1rem;
  color: #444;
  margin-bottom: 0.5rem;
}
@media (max-width: 900px) {
  .resources-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  .resources-right {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
