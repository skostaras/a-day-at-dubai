import { Pipe, PipeTransform } from "@angular/core"

@Pipe({ name: 'urlShortenPipe' })
export class UrlShortenPipe implements PipeTransform {
    transform(value: string, ...args: any[]) {

        const checkString1 = 'http://www.';
        const checkString2 = 'https://www.';
        const checkString3 = 'www.';
        const checkString4 = 'https://';
        const checkString5 = 'http://';
        const checkString6 = '/';


        if (value.startsWith(checkString1)) {
            return value.substring(checkString1.length);
        }

        if (value.startsWith(checkString2)) {
            return value.substring(checkString2.length);
        }

        if (value.startsWith(checkString3)) {
            return value.substring(checkString3.length);
        }

        if (value.startsWith(checkString4)) {
            return value.substring(checkString4.length);
        }

        if (value.startsWith(checkString5)) {
            return value.substring(checkString5.length);
        }

        if (value.endsWith(checkString6)) {
            return value.slice(0, -1);
        }

        return value;

    }



}