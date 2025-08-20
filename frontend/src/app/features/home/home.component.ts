import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cities = [
    {
      title: "Gangtok",
      description: "The vibrant capital of Sikkim, known for its lively markets, monasteries, and breathtaking views of the Kanchenjunga.",
      img: "assets/images/places/gangtok.jpg",
      link: "#"
    },
    {
      title: "Namchi",
      description: "A spiritual and cultural hub featuring the famous Char Dham and Samdruptse Statue, surrounded by lush tea gardens.",
      img: "assets/images/places/namchi.jpg",
      link: "#"
    },
    {
      title: "Majitar",
      description: "A serene riverside town nestled in the Teesta valley, ideal for nature lovers and peaceful retreats.",
      img: "assets/images/places/majitar.jpg",
      link: "#"
    },
    {
      title: "Singtam",
      description: "A bustling trade town on the banks of River Teesta, serving as a gateway to East and South Sikkim.",
      img: "assets/images/places/singtam.jpg",
      link: "#"
    },
    {
      title: "Rumtek",
      description: "Home to the world-famous Rumtek Monastery, offering rich Tibetan Buddhist culture and panoramic mountain views.",
      img: "assets/images/places/rumtek.jpg",
      link: "#"
    }
  ];

  features = [
    {
      title: "Gangtok",
      description: "The vibrant capital of Sikkim, known for its lively markets, monasteries, and breathtaking views of the Kanchenjunga.",
      svg: "assets/images/places/gangtok.jpg",
      link: "#"
    },
    {
      title: "Namchi",
      description: "A spiritual and cultural hub featuring the famous Char Dham and Samdruptse Statue, surrounded by lush tea gardens.",
      svg: "assets/images/places/namchi.jpg",
      link: "#"
    },
    {
      title: "Majitar",
      description: "A serene riverside town nestled in the Teesta valley, ideal for nature lovers and peaceful retreats.",
      svg: "assets/images/places/majitar.jpg",
      link: "#"
    },
  ];

}
