const listOfBlogs = document.querySelector('.collapsible');

db.collection('blogs').get().then(snapshot => {
   
   
    // for fire base
    let html = '';
    const data=snapshot.docs;
   
       data.forEach(doc => {
      const blog = doc.data();
      const li = `
        <li><div class="collapsible-header #ef5350 red lighten-1">
        ${blog.title}
        </div>
        <div class="collapsible-body  #ef9a9a red lighten-3">
          <span>${blog.content}</span>
        </div>
        </li>
      `;
      html += li;
    });
    listOfBlogs.innerHTML = html;
    
  
  });

 //for collapsble blogs 
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });
