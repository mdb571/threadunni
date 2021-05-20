import React from 'react'

export default function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map(str => <p>{str}</p>);
  

    return ( newText)
      
}
