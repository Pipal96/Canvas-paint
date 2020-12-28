class Paint {
    constructor(canvas, myColor, getPixel) {
        this.canvas = canvas
            this.myColor = myColor
        this.getPixel = getPixel
        this.currentPixel = 3
            this.ctx = canvas.getContext('2d')
    }
    listenCanvas() {
        let mouseEvent = () => {
            this.canvas.addEventListener('mousemove', print)
        }
        let print = event => {
            let x = event.clientX;
            let y = event.clientY;
            this.ctx.fillStyle = this.myColor
            this.ctx.fillRect(x - 10, y - 40, this.currentPixel, this.currentPixel)
        }
        this.canvas.addEventListener('mousedown', mouseEvent)
        this.canvas.addEventListener('mouseup', () => {
            this.canvas.removeEventListener('mousemove', print)
        })
    }
    changeColor(){
        this.myColor.addEventListener('input', event => {
           this.myColor = event.target.value
            localStorage.setItem('myColor', this.myColor)
        })
    }
    setPixel() {
        this.getPixel.addEventListener('input', event => {
            this.currentPixel = event.target.value
            localStorage.setItem('currentPixel',  this.currentPixel)
        })
    }
    setStorageColor() {
        let storageValue = localStorage.getItem('myColor')
        if (storageValue){
            this.myColor.setAttribute('value', storageValue)
            this.myColor = storageValue
        }
    }
    setStoragePixel() {
        let storageValue = localStorage.getItem('currentPixel')
        if (storageValue){
            for (const child of this.getPixel.children) {
                 if(child.value === storageValue) {
                     child.setAttribute('selected', 'true')
                     this.currentPixel = storageValue
                 }
            }
        }
    }
    init() {
        this.changeColor()
        this.setPixel()
        this.setStorageColor()
        this.setStoragePixel()
        this.listenCanvas()
    }
}
const paint = new Paint(
    document.getElementById('paint'),
    document.getElementById('my-color'),
    document.getElementById('pixels'));
paint.init()