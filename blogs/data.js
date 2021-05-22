const listOfBlogs = document.querySelector('.blogcontent');

db.collection('blogs').get().then(snapshot => {
   
   
    
    let html = '';
    const data=snapshot.docs;
   
       data.forEach(doc => {
      const blog = doc.data();
      const li = `
        <li>
        <button type="button" class="collapsible" ><h3>${blog.title}</h3></button>
        <div class="content">
          <p>${blog.content}</p>
        </div>
        </li>
      `;
      html += li;
    });
    listOfBlogs.innerHTML = html;
    
  
  });
