import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';

describe('Testing the services', () => {
    describe('When call an article with its ID', () => {
        let fetchDB;
        before(mochaAsync(async () => {
            fetchDB = await fetch('http://localhost:3000/api/article/5').then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            });
        }));
        it('should return the good Article', () => {
            chai.expect(fetchDB.id).to.equal(5);
        });
    });
});