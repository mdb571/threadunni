import React from 'react'
import ReactLinkify from 'react-linkify';

export default function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map(str => <ReactLinkify key={str}><p>{str}</p></ReactLinkify>);
  

    return ( newText)
      
}
