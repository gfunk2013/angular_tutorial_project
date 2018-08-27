import {Component, OnInit} from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    errorMessage: string;
    pageTitle: string = 'Hello There';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    products: IProduct[];
    filteredProducts: IProduct[];
    _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter(
            (product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    hasImage(product: any): string {
        if (product.imageUrl) {
            return product.imageUrl;
        } else {
            return 'https://cdn.pixabay.com/photo/2015/06/09/16/12/error-803716__340.png';
        }
    }

    onRatingClicked(message: string): void {
        this.pageTitle = message;
    }

    constructor(private _productService: ProductService) {
    }

    ngOnInit(): void {
        this._productService.getProducts()
        .subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
    }


}
