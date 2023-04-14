import { Model } from "./models/Model";
import { Training } from "./views/Training";
import { Controller } from "./controllers/Controller";

new Controller(new Model(), new Training());
