import "../src/app/globals.css"

// import Logo from '../public/Logo.png';
import axios from "axios";
import { useState } from "react";
export default function Welcome() {
  

  // Make an Axios request with the Bearer token in the header
 
return (<div> 
   <img src='Logo.png'></img>
    <table>
    <tbody>
      <tr>
        <th>Serial Number</th>
        <th>Course Code</th>
        <th>Course Name</th>
      </tr>
      <tr>
        <td>1</td>
        <td>CS207</td>
        <td>Data Structures and Algorithms</td>
      </tr>
      <tr>
        <td>2</td>
        <td>CS203</td>
        <td>Database Management System</td>
      </tr>
      <tr>
        <td>3</td>
        <td>CS201</td>
        <td>Discrete Mathematics</td>
      </tr>
      <tr>
        <td>4</td>
        <td>MA203</td>
        <td>Complex Analysis and Differential Equations </td>
      </tr>
    </tbody>
  </table>
   
  </div>

)};

