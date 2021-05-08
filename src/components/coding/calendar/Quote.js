import React from 'react';

const quotes = [
    (<div>
        <p>Convince yourself that you have the power to be all what you wish to be. It is YOU who could generate in you a huge power of motivation to push you forward and ignite you to think and to do.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>You can’t go back and change the beginning, but you can start where you are and change the ending.<br/>—<strong>C. S. Lewis</strong></p>
    </div>),
    (<div>
        <p>Happiness is not the absence of problems, it’s the ability to deal with them.<br/>—<strong>Steve Maraboli</strong></p>
    </div>),
    (<div>
        <p>The most precious gift we can offer others is our presence. When our mindfulness embr/aces those we love, they will bloom like flowers.<br/>—<strong>Thich Nhat Hanh</strong></p>
    </div>),
    (<div>
        <p>Miracles start to happen when you give as much energy to your dreams as you do to your fears.<br/>—<strong>Richard Wilkins</strong></p>
    </div>),
    (<div>
        <p>If you are not willing to learn, no one can help you. If you are determined to learn, no one can stop you.<br/>—<strong>Zig Ziglar</strong></p>
    </div>),
    (<div>
        <p>Don’t&nbsp;be upset with people and situations in your life, because both are powerless without your reaction.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>Be patient. Empires are not built in a day<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>Never perceive anything as being inevitable or predestined. The only absolute is uncertainty.<br/>—<strong>Lionel Suggs</strong></p>
    </div>),
    (<div>
        <p>Love is a fruit in season at all times and within reach of every hand.<br/>—<strong>Mother Teresa</strong></p>
    </div>),
    (<div>
        <p>The truest indication of gratitude is to return what you are grateful for.<br/>—<strong>Richard Paul Evans</strong></p>
    </div>),
    (<div>
        <p>There’s no need to rush. What’s meant for you always arrives right on time.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>Happiness lies in the joy of achievement and the thrill of creative effort.<br/>—<strong>Franklin D. Roosevelt</strong></p>
    </div>),
    (<div>
        <p>Find the sweetness in your own heart so that you may find the sweetness in every Heart!<br/>—<strong>Rumi</strong></p>
    </div>),
    (<div>
        <p>Open your eyes to the beauty around you, Open your mind to the wonders of life, Open your heart to those who love you, And always be true to yourself.<br/>—<strong>Maya Angelou</strong></p>
    </div>),
    (<div>
        <p>For everything you have lost, you have gained something else.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>A failure establishes only this, that our determination to succeed was not strong enough.<br/>—<strong>John Christian Bovee</strong></p>
    </div>),
    (<div>
        <p>Doing what you like is freedom. Liking what you do is happiness.<br/>—<strong>Frank Tyger</strong></p>
    </div>),
    (<div>
        <p>The universe will often give you what you truly desire, even when you didn’t realize it was what you were truly wanting.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>We have a ‘strategic’ plan. It’s called doing things.<br/>—<strong>Herb Kelleher</strong></p>
    </div>),
    (<div>
        <p>Your future is created by what you do today, not tomorrow.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>The happiest people don’t have the best of everything, they make the best of everything.<br/>—<strong>Unknown</strong><br/></p>
    </div>),
    (<div>
        <p>In&nbsp;life, you’ll meet two kinds of people. The ones who build you up and the ones who tear you down. In the end, you’ll thank them both.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>I thank all those who laughed at my dreams; you taught me to grow respecting other people’s struggles<br/>—<strong>Paulo Coelho</strong></p>
    </div>),
    (<div>
        <p>Always stay true to yourself and never sacrifice who you are for anyone.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>You can’t change what’s going on around you until you start changing what’s going on within you.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>The price of inaction is far greater than the cost of making a mistake.<br/>—<strong>Meister Eckhart</strong></p>
    </div>),
    (<div>
        <p>Never give anyone the power to take away your joy.<br/>—<strong>Jeanette Jenkins</strong></p>
    </div>),
    (<div>
        <p>Love is like the wind. You can’t see it, but you can feel it.<br/>—<strong>Nicholas Sparks.</strong></p>
    </div>),
    (<div>
        <p>If you paint in your mind a picture of br/ight and happy expectations, you put yourself into a condition conducive to your goals.<br/>—<strong>Norman Vincent Peale</strong></p>
    </div>),
    (<div>
        <p>Don’t be scared to walk alone. Don’t be scared to like it.<br/>—<strong>John Mayer</strong></p>
    </div>),
    (<div>
        <p>To be a champ, you have to believe in yourself when nobody else will.<br/>—<strong>Sugar Ray Robinson</strong></p>
    </div>),
    (<div>
        <p>Nobody is superior, nobody is inferior, but nobody is equal either. People are simply unique, incomparable.<br/>—<strong>Osho</strong></p>
    </div>),
    (<div>
        <p>Some people feel the rain. Others just get wet.<br/>—<strong>Bob Marley</strong></p>
    </div>),
    (<div>
        <p>Good things come to those who go get them.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>You are searching the world for treasure, but the real treasure is Yourself.<br/>—<strong>Rumi</strong></p>
    </div>),
    (<div>
        <p>The greatest mistake we make is living in constant fear that we will make one.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>If you think you can win, you can win. Faith is necessary to victory.<br/>—<strong>William Hazlitt</strong></p>
    </div>),
    (<div>
        <p>You are the universe, expressing itself as a human for a little while.<br/>—<strong>Eckhart Tolle</strong></p>
    </div>),
    (<div>
        <p>To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.<br/>—<strong>Ralph Waldo Emerson</strong></p>
    </div>),
    (<div>
        <p>Love is the big booming beat which covers up the noise of hate.<br/>—<strong>Margaret Cho</strong></p>
    </div>),
    (<div>
        <p>When you find peace within yourself, you become the kind of person who can live at peace with others.<br/>—<strong>Peace Pilgrim</strong></p>
    </div>),
    (<div>
        <p>The Universe is not punishing you or blessing you. The Universe is responding to the vibr/ational attitude that you are emitting.<br/>—<strong>LOA</strong></p>
    </div>),
    (<div>
        <p>Once you carry your own water, you will learn the value of every drop.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>Don’t compare yourself to others. Keep playing the competitive game between you and you.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>He who lives in harmony with himself lives in harmony with the universe.<br/>—<strong>Marcus Aurelius</strong></p>
    </div>),
    (<div>
        <p>We should all start to live before we get too old. Fear is stupid. So are regrets.<br/>—<strong>Marilyn Monroe</strong></p>
    </div>),
    (<div>
        <p>I cannot do all the good that the world needs. But the world needs all the good that I can do.<br/>—<strong>J. Stanfield</strong></p>
    </div>),
    (<div>
        <p>Don’t chase people. Be you, do your own thing and work hard. The right people who belong in your life will come to you, and stay.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>The great man is he who does not lose his child’s-heart.<br/>—<strong>Mencius</strong></p>
    </div>),
    (<div>
        <p>He who lives in harmony with himself lives in harmony with the universe.<br/>—<strong>Marcus Aurelius</strong></p>
    </div>),
    (<div>
        <p>What you become is the result of what you do today. In other words, you are preparing for something.<br/>—<strong>John C. Maxwell</strong></p>
    </div>),
    (<div>
        <p>Be who you are and say what you feel because those who mind don’t matter and those who matter don’t mind.<br/>—<strong>Dr Seuss</strong><br/></p>
    </div>),
    (<div>
        <p>How people treat you is their karma; how you react is yours.<br/>—<strong>Wayne W. Dyer</strong></p>
    </div>),
    (<div>
        <p>Good things come to those who believe, better things come to those who are patient, and the best things come to those who don’t give up.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>Gratitude can transform common days into thanksgivings, turn routine jobs into joy, &amp; change ordinary opportunities into blessings.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>Men are not prisoners of fate, but prisoners of their own minds.<br/>—<strong>Franklin D. Roosevelt</strong></p>
    </div>),
    (<div>
        <p>People rarely succeed unless they have fun in what they are doing.<br/>—<strong>Dale Carnegie</strong></p>
    </div>),
    (<div>
        <p>The Universe has a plan for you, and it’s Good.<br/>—<strong>Russell Kyle</strong></p>
    </div>),
    (<div>
        <p>Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.<br/>—<strong>Christian D. Larson</strong></p>
    </div>),
    (<div>
        <p>You don’t have to be great to get started, but you have to get started to be great.<br/>—<strong>Les Br/own</strong></p>
    </div>),
    (<div>
        <p>When we strive to become better than we are, everything around us becomes better, too.<br/>—<strong>Paulo Coelho</strong></p>
    </div>),
    (<div>
        <p>The person who says it cannot be done should not interrupt the person doing it.<br/>—<strong>Chines Proverb</strong></p>
    </div>),
    (<div>
        <p>Don’t ever give up on what makes you truly happy.<br/>—<strong>Jonathan Landsman</strong></p>
    </div>),
    (<div>
        <p>Healing always involves facing truths we’d rather not face, and accepting responsibility we’d rather not accept.<br/>—<strong>Dr. David Hawkins</strong></p>
    </div>),
    (<div>
        <p>Most people find change difficult to accept, sometimes for good reasons, sometimes because of plain old inertia. <br/>—<strong>Andrew Hunt</strong></p>
    </div>),
    (<div>
        <p>An investment in knowledge always pays the best interest.<br/>—<strong>Benjamin Franklin</strong></p>
    </div>),
    (<div>
        <p>There is one technique that you must use if you want people to listen to you: listen to them.<br/>—<strong>Andrew Hunt</strong></p>
    </div>),
    (<div>
        <p>Attitude is a choice. Think positive thoughts daily. Believe in yourself.<br/>—<strong>Pat Summitt</strong></p>
    </div>),
    (<div>
        <p>The minute you get away from fundamentals – proper technique, work ethic or mental prep – the bottom can fall out of your game.<br/>—<strong>Michael Jordan</strong></p>
    </div>),
    (<div>
        <p>Never give up! Failure and rejection are only the first step to succeeding.<br/>—<strong>Jim Valvano</strong></p>
    </div>),
    (<div>
        <p>If you want help, help others. If you want love, give it. If you want respect, show it. Whatever you want more of, start giving more of.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>Can you remember who you were, before the world told you who you should be?<br/>—<strong>Charles Bukowski</strong></p>
    </div>),
    (<div>
        <p>Tell everyone what you want to do and someone will want to help you do it.<br/>—<strong>W. Clement Stone</strong></p>
    </div>),
    (<div>
        <p>Learn to say ‘no’ to the good so you can say ‘yes’ to the best. <br/>—<strong>John C. Maxwell</strong></p>
    </div>),
    (<div>
        <p>The world is full of magic things, patiently waiting for our senses to grow sharper.<br/>—<strong>W.B. Yeats</strong></p>
    </div>),
    (<div>
        <p>Magic is believing in yourself, if you can do that, you can make anything happen.<br/>—<strong>Johann Wolfgang von Goethe</strong></p>
    </div>),
    (<div>
        <p>We have to do the best we are capable of. This is our sacred human responsibility.<br/>—<strong>Albert Einstein</strong></p>
    </div>),
    (<div>
        <p>When you have confidence, you can have a lot of fun. And when you have fun, you can do amazing things.<br/>—<strong>Joe Namath</strong></p>
    </div>),
    (<div>
        <p>Great things never came from comfort zones.<br/>—<strong>Neil Strauss</strong></p>
    </div>),
    (<div>
        <p>The first to apologize is the br/avest. The first to forgive is the strongest. The first to forget is the happiest.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>Don’t worry about failures, worry about the chances you miss when you don’t even try.<br/>—<strong>Jack Canfield</strong></p>
    </div>),
    (<div>
        <p>Always bear in mind that your own resolution to succeed is more important than any other one thing.<br/>—<strong>Abr/aham Lincoln</strong></p>
    </div>),
    (<div>
        <p>The past has no power over the present moment.<br/>—<strong>Eckhart Tolle</strong></p>
    </div>),
    (<div>
        <p>If you want something you never had, you have to do something you’ve never done.<br/>—<strong>Thomas Jefferson</strong></p>
    </div>),
    (<div>
        <p>Luck is a dividend of sweat. The more you sweat, the luckier you get.<br/>—<strong>Ray Kroc</strong></p>
    </div>),
    (<div>
        <p>It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.<br/>—<strong>Charles Darwin</strong></p>
    </div>),
    (<div>
        <p>It takes as much energy to wish as it does to plan.<br/>—<strong>Eleanor Roosevelt</strong></p>
    </div>),
    (<div>
        <p>The greatest crime in the world is not developing your potential. When you do what you do best, you are helping not only yourself but the world.<br/>—<strong>Roger Williams</strong></p>
    </div>),
    (<div>
        <p>Once you replace negative thoughts with positive ones, you’ll start having positive results.<br/>—<strong>Willie Nelson</strong></p>
    </div>),
    (<div>
        <p>Education is the key to unlock the golden door of freedom.<br/>—<strong>George Washington Carve</strong></p>
    </div>),
    (<div>
        <p>It’s not your job to like me, it’s mine.<br/>—<strong>Byron Katie</strong></p>
    </div>),
    (<div>
        <p>We must never be afraid to go too far, for success lies just beyond.<br/>—<strong>Marcel Proust</strong></p>
    </div>),
    (<div>
        <p>Embr/ace what you don’t know, especially in the beginning, because what you don’t know can become your greatest asset. It ensures that you will absolutely be doing things different from everybody else.<br/>—<strong>Sara Blakely</strong></p>
    </div>),
    (<div>
        <p>We are what we repeatedly do. Excellence, then, is not an act but a habit.<br/>—<strong>Aristotle</strong></p>
    </div>),
    (<div>
        <p>Even if I knew that tomorrow the world would go to pieces, I would still plant my apple tree.<br/>—<strong>Martin Luther King Jr.</strong></p>
    </div>),
    (<div>
        <p>Education is the key to unlock the golden door of freedom.<br/>—<strong>George Washington Carve</strong></p>
    </div>),
    (<div>
        <p>En la vida algunas veces se gana, otras veces se aprende.<br/>—<strong>John Maxwell</strong></p>
    </div>),
    (<div>
        <p>Happiness comes from WHAT we do. Fulfillment comes from WHY we do it.<br/>—<strong>Simon Sinek</strong></p>
    </div>),
    (<div>
        <p>Build your own dreams, or someone else will hire you to build theirs.<br/>—<strong>Farrah Gray</strong></p>
    </div>),
    (<div>
        <p>The limits of the possible can only be defined by going beyond them into the impossible.<br/>—<strong>Arthur C. Clarke</strong></p>
    </div>),
    (<div>
        <p>All we have is what we do right now. That’s all we’ll ever have.   Life is a series of moments. And if you show up authentically in more and more moments, you start to patch together a beautiful life.<br/>—<strong>Unknown</strong></p>
    </div>),
    (<div>
        <p>A good traveler has no fixed plans, and is not intent on arriving.<br/>—<strong>Lao Tzu</strong></p>
    </div>),
    (<div>
        <p>I don’t know what your destiny will be, but one thing I know: The only ones among you who will be truly happy are those who have sought and found how to serve.<br/>—<strong>Albert Schweitzer</strong></p>
    </div>),
    (<div>
        <p>Build something 100 people love, not something one million people kind of like.<br/>—<strong>Br/ian Chesky</strong></p>
    </div>),
    (<div>
        <p>Tough times never last, but tough people do.<br/>—<strong>Dr. Robert Schuller</strong></p>
    </div>),
    (<div>
        <p>Take chances, make mistakes. That’s how you grow. Pain nourishes your courage. You have to fail in order to practice being br/ave.<br/>—<strong>Mary Tyler Moore</strong></p>
    </div>),
    (<div>
        <p>Do not indulge in dreams of having what you have not, but reckon up the chief of the blessings you do possess, and then thankfully remember how you would crave for them if they were not yours.<br/>—<strong>Marcus Aurelius</strong></p>
    </div>),
    (<div>
        <p>Everything you’ve ever wanted is on the other side of fear.<br/>—<strong>George Addair</strong></p>
    </div>),
    (<div>
        <p>Success is walking from failure to failure with no loss of enthusiasm.<br/>—<strong>Winston Churchil</strong></p>
    </div>),
    (<div>
        <p>Always make a total effort, even when the odds are against you.<br/>—<strong>Arnold Palmer</strong></p>
    </div>),
    (<div>
        <p>Always forgive your enemies. Nothing annoys them more.<br/>—<strong>Oscar Wilde</strong></p>
    </div>),
    (<div>
        <p>Start making your own happiness a priority.<br/>—<strong>LOA</strong></p>
    </div>),
    (<div>
        <p>I have not failed. I’ve just found 10,000 ways that won’t work.<br/>—<strong>Thomas Edison</strong></p>
    </div>),
    (<div>
        <p>Try to be a rainbow in someone’s cloud.<br/>—<strong>Maya Angelou</strong></p>
    </div>),
    (<div>
        <p>Conditions are never perfect. ‘Someday’ is a disease that will take your dreams to the grave with you…. If it’s important to you and you want to do it ‘eventually,’ just do it and correct course along the way.<br/>—<strong>Tim Ferriss</strong></p>
    </div>),
    (<div>
        <p>Be happy now. Feel good now. That’s the only thing you have to do.<br/>—<strong>Unknown</strong></p>
    </div>),
]

export default () => {
    return (
        <div style={{
            'display': 'flex',
            'height': '100%',
            'align-content': 'center',
            'justify-content': 'center',
            'align-items': 'center',
            'font-size': '36px',
        }}>
            {quotes[Math.floor(Math.random() * 116)]}
        </div>
    )
}