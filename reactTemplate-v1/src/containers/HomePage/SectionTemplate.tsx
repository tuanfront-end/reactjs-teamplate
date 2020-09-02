import React, { FC } from 'react';
import { View, Button } from 'shared';
import ChooseCard from 'components/ChooseCard/ChooseCard';
import Section from 'components/Section/Section';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import MasonryCss from 'components/MasonryCss/MasonryCss';

const data = [
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/upcoming-events-calendar-e3720781e069833caafc79cbe13424e5.jpg?ts=1561533041',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/mega-sale-instagram-video-post-design-template-a9f2e3449ca63a3c69632190767ff255.jpg?ts=1574600524',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/praise-and-worship-flyer-template-110bab3f61e00bab07972b77688f40dd.jpg?ts=1561456353',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/summer-party-video-ad-template-design-024d0ddcdf0746f9fa1e87773c385103.jpg?ts=1567082239',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-indie-rock-concert-square-video-design-template-df329aecc47bd0f7171a662bbb7e6ab1.jpg?ts=1567082891',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/kids-summer-camp-poster-flyer-template-design-56587b51aecfd38b80855078d56ea9cf.jpg?ts=1561554021',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/instagram-video-post-black-lives-matter-design-template-8c6c0958e6ee676cba943e0229f8e2e5.jpg?ts=1591907694',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/4th-of-july-design-template-d0f0cfeb0f42318a4a51dd1659bde7ea.jpg?ts=1561532712',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/disinfecting-services-business-flyer-design-template-ebe52ffcc9d86846ba6c9ed62a12a380.jpg?ts=1584618609',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coronavirus-outbreaks-poster-design-template-639cc7c7787fabd54a48875b05ed57c0.jpg?ts=1581401435',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pink-animated-zoom-background-design-template-1bc0512755c018643c904b7e1b4299f3.jpg?ts=1586358934',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/party-poster-template-7bc94c1a5574e8fb7432829d8bf012a6.jpg?ts=1561468244',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corona-virus-awareness%2C-work-from-home-design-template-0daa40b1b7b369dd108b96ab168257cf.jpg?ts=1585059209',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/tax-%26-consulting-services-flyer-poster-template-design-5916c0e6be4c5b18036aa1938922db27.jpg?ts=1561457955',
];

const SectionTemplate: FC = () => {
  return (
    <Section>
      <View container>
        <View row tachyons="justify-center">
          <SectionTitle
            columns={[12, 10, 8]}
            tachyons={['tc', 'mb5']}
            title="What will you design today?"
            text="Use one of 20.000+ templates and simple drag & drop design tools to help you create beautiful designs in minutes."
          />
        </View>
        <MasonryCss columnCount={6} columnWidth={150}>
          {data.map(uri => {
            return <ChooseCard key={uri} buttonText="Using Template" uri={uri} title="Template" />;
          })}
        </MasonryCss>
        <View tachyons={['flex', 'justify-center', 'mt5']}>
          <Button radius="round" size="large" nightModeBlacklist="color">
            View More Templates
          </Button>
        </View>
      </View>
    </Section>
  );
};

export default SectionTemplate;
