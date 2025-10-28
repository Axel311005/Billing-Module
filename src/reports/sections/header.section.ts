import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 95,
  height: 95,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 30],
  //width: 100,
  fontSize: 10,

  //width: 150, // ✅ ahora sí permitido dentro de columns
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, showDate = true, showLogo = true, subtitle } = options;

  const headerLogo: Content | null = showLogo ? logo : null;

  const headerDate: Content | null = showDate ? currentDate : null;

  const headerSubtitle: Content | null = subtitle
    ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 16,
          bold: true,
        },
      }
    : null;

  const headerTitle: Content | null = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 15, 0, 0],
            style: {
              bold: true,
              fontSize: 22,
            },
          },
          headerSubtitle,
        ].filter(Boolean) as Content[], // ✅ quitamos nulls
      }
    : null;

  return {
    columns: [
      headerLogo,
      {
        ...headerTitle,
        width: '*',
        alignment: 'center',
      },
      {
        ...headerDate,
        width: 95,
        //heigh: 50,
      },
    ].filter(Boolean) as Content[],
  };
};
