export class MathUtil {

    // ラジアンを度数に変換する
    public static rad2Deg(radian: number): number {
        return radian * 180 / Math.PI
    }
        
    // 度数をラジアンに変換する
    public static deg2Rad(degree: number): number {
        return degree * Math.PI / 180;
    }
}