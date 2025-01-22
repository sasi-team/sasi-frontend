import { Component } from '@angular/core';
import { HomeComponent } from "../../views/home/home.component";
import { HeroComponent } from "../ui/hero/hero.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [HeroComponent, FooterComponent],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {

}
