import Sequelize from 'sequelize';
import { sequelize } from '../../config/config-db';
import talents from './talents';
import users from './users';
import talents_images from './talents_images';
import talents_comments from './talents_comments';
import talents_cart from './talents_cart';
import orders from './orders';
import lite_items from './lite_items'

const models = {
    Users: users(sequelize, Sequelize),
    Talents_images: talents_images(sequelize, Sequelize),
    Talents_comments: talents_comments(sequelize, Sequelize),
    Talents_cart:talents_cart(sequelize, Sequelize),
    Orders: orders(sequelize, Sequelize),
    Lite_items: lite_items(sequelize, Sequelize),
    Talents: talents(sequelize, Sequelize)
}

//4. create relation OneToMany | ManyToMany
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

// 5. export sequalize agar bisa di-call di module lain
export default models;