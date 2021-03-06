import Image from '../models/image'

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://192.168.18.57:3333/uploads/${image.path}`
        };
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
}