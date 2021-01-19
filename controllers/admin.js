const Product = require('../models/product');
const Category = require('../models/category');
const Bayi = require('../models/bayi');

exports.getProducts = (req, res, next) => {
    Product
        .find({ userId: req.user._id })
        .populate('userId', 'name -_id')
        .select('name price imageUrl userId')
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getBayi = (req, res, next) => {
    Bayi
        .find({ userId: req.user._id })
        .populate('userId', 'name -_id')
        .select('name no imageUrl userId')
        .then(bayi => {
            res.render('admin/bayi', {
                title: 'Admin Bayi',
                bayi: bayi,
                path: '/admin/bayi',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getAddBayi = (req, res, next) => {
    res.render('admin/add-bayi', {
        title: 'Yeni Bayi',
        path: '/admin/add-bayi'
    });
}

exports.postAddBayi = (req, res, next) => {

    const name = req.body.name;
    const no = req.body.no;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const bayi = new Bayi(
        {
            name: name,
            no: no,
            imageUrl: imageUrl,
            description: description,
            userId: req.user
        }
    );

    bayi.save()
        .then(() => {
            res.redirect('/admin/bayi');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEditBayi = (req, res, next) => {
    console.log(req.params.bayi,req.user._id)
    Bayi.findOne(
        { _id: req.params.bayi, userId: req.user._id })
        .then(bayi => {
            if (!bayi) {
                return res.redirect('/');
            }
            return bayi;
        })
        .then(bayi => {
            res.render('admin/edit-bayi', {
                title: 'Bayi düzenle',
                path: '/admin/bayi',
                bayi: bayi,
                isAuthenticated: req.session.isAuthenticated
            });
        })
        .catch(err => { console.log(err) });
}

exports.postEditBayi = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const no = req.body.no;
    const description = req.body.description;
    const ids = req.body.categoryids;

    console.log(req.body);

    Bayi.updateOne({ _id: id, userId: req.user._id }, {
        $set: {
            name: name,
            no: no,
            description: description,
            categories: ids
        }
    }).then(() => {
        res.redirect('/admin/bayi?action=edit');
    }).catch(err => console.log(err));


}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'New Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const product = new Product(
        {
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            userId: req.user
        }
    );

    product.save()
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEditProduct = (req, res, next) => {
    Product.findOne(
        { _id: req.params.productid, userId: req.user._id })
        //.populate('categories', 'name -_id')
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            return product;
        })
        .then(product => {

            Category.find()
                .then(categories => {

                    categories = categories.map(category => {

                        if (product.categories) {
                            product.categories.find(item => {
                                if (item.toString() === category._id.toString()) {
                                    category.selected = true;
                                }
                            })
                        }

                        return category;
                    })

                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        path: '/admin/products',
                        product: product,
                        categories: categories,
                        isAuthenticated: req.session.isAuthenticated
                    });


                })

        })
        .catch(err => { console.log(err) });
}

exports.postEditProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const ids = req.body.categoryids;

    Product.update({ _id: id, userId: req.user._id }, {
        $set: {
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            categories: ids
        }
    }).then(() => {
        res.redirect('/admin/products?action=edit');
    }).catch(err => console.log(err));


}

exports.postDeleteBayi = (req, res, next) => {
    console.log(req.body.bayi);
    const id = req.body.bayi;

    Bayi.deleteOne({ _id: id, userId: req.user._id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.redirect('/');
            }
            res.redirect('/admin/bayi?action=delete');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postDeleteProduct = (req, res, next) => {

    const id = req.body.productid;

    Product.deleteOne({ _id: id, userId: req.user._id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.redirect('/');
            }
            res.redirect('/admin/products?action=delete');
        })
        .catch(err => {
            console.log(err);
        });
}


exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category',
        path: '/admin/add-category'
    });
}


exports.postAddCategory = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;

    const category = new Category({
        name: name,
        description: description
    });

    category.save()
        .then(result => {
            res.redirect('/admin/categories?action=create');
        })
        .catch(err => console.log(err));
}

exports.getCategories = (req, res, next) => {

    Category.find()
        .then(categories => {
            res.render('admin/categories', {
                title: 'Categories',
                path: '/admin/categories',
                categories: categories,
                action: req.query.action
            });
        }).catch(err => console.log(err));
}


exports.getEditCategory = (req, res, next) => {
    Category.findById(req.params.categoryid)
        .then(category => {
            res.render('admin/edit-category', {
                title: 'Edit Category',
                path: '/admin/categories',
                category: category
            })
        })
        .catch(err => console.log(err));
}

exports.postEditCategory = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    Category.findById(id)
        .then(category => {
            category.name = name;
            category.description = description;
            return category.save();
        }).then(() => {
            res.redirect('/admin/categories?action=edit');
        })
        .catch(err => console.log(err));

}

exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryid;

    Category.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/categories?action=delete');
        })
        .catch(err => {
            console.log(err);
        })
}
