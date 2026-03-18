export function numberToVietnameseWords(number) {
    if (number === 0) return "Không đồng";
    if (number < 0) return "Số âm";

    const units = ["", "ngàn", "triệu", "tỷ", "ngàn tỷ", "triệu tỷ"];
    const digits = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

    function readThreeDigits(n, isLastBlock) {
        let res = "";
        const hund = Math.floor(n / 100);
        const ten = Math.floor((n % 100) / 10);
        const unit = n % 10;

        if (hund > 0 || !isLastBlock) {
            res += digits[hund] + " trăm ";
        }

        if (ten > 0) {
            if (ten === 1) res += "mười ";
            else res += digits[ten] + " mươi ";
        } else if (hund > 0 && unit > 0) {
            res += "lẻ ";
        }

        if (unit > 0) {
            if (unit === 1 && ten > 1) res += "mốt";
            else if (unit === 5 && ten > 0) res += "lăm";
            else res += digits[unit];
        }

        return res.trim();
    }

    let res = "";
    let unitIdx = 0;
    let tempNumber = Math.floor(number);

    while (tempNumber > 0) {
        const block = tempNumber % 1000;
        if (block > 0) {
            const blockText = readThreeDigits(block, tempNumber < 1000);
            res = blockText + " " + units[unitIdx] + " " + res;
        }
        tempNumber = Math.floor(tempNumber / 1000);
        unitIdx++;
    }

    res = res.trim();
    if (res.length > 0) {
        res = res.charAt(0).toUpperCase() + res.slice(1);
        return res + " đồng";
    }

    return "Không đồng";
}

export function formatVietnameseCurrency(number) {
    return new Intl.NumberFormat('vi-VN').format(number);
}
