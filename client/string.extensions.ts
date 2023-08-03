interface String  {
    log(): void;
}

String.prototype.log = function () {

    console.log(this.toString());
}