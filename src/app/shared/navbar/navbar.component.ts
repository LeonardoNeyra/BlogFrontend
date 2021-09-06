import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    // Menu-toggle button
    $(document).ready(function() {
      $(".menu-icon").on("click", function() {
        $("ul").toggleClass("showing");
      });
    });

    // Scrolling Effect
    $(window).on("scroll", function() {
      if($(window).scrollTop()) {
        $('nav').addClass('black');
      }
      else {
        $('nav').removeClass('black');
      }
    });

    // Button ripple effect
    // const buttons = document.querySelectorAll('a');

    // Array.from(buttons).forEach(btn => {
    //   btn.addEventListener('click', function(event: MouseEvent):void {
    //     let x = event.clientX - 20;
    //     let y = event.clientY - 20;
        
    //     const circle = document.createElement("span");
    //     circle.style.left = x + 'px';
    //     circle.style.top = y + 'px';
    //     console.log(circle);
        
    //     this.appendChild(circle);
    //   });
    // });
  }

  createRipple(event) {
    // const button = event.currentTarget;
  
    // const circle = document.createElement("span");
    // const diameter = Math.max(button.offsetWidth, button.offsetHeight);
    // const radius = diameter / 2;
  
    // // circle.style.width = circle.style.height = `${diameter}px`;
    // circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    // circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    // // circle.classList.add("ripple");
  
    // // const ripple = button.getElementsByClassName("ripple")[0];
  
    // // if (ripple) {
    // //   ripple.remove();
    // // }
  
    // button.appendChild(circle);
  }

}
