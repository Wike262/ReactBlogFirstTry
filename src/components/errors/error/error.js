import React from 'react';


const error = (props) => {

 return (
  <div className="Error-Wrapper">
   <div className="Error-Contert">
    <div className="Error-Title">
     <h3>
      {
       !!props.title ?
        props.title
        :
        'Something went wrong'
      }
     </h3>
    </div>
   </div>
  </div>
 )
}

export default error;