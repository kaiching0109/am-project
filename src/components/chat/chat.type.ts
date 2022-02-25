/**
 * status:
 * 1: success
 * 0: no status
 * -1: error
 */
export type Status = '1' | '0' | '-1';

export type Direction = 'l' | 'r';

export type Profile = {
  imgSrc: string;
  name: string;
}
